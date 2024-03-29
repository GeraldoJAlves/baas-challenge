jest.unmock('bcrypt')
jest.unmock('jsonwebtoken')
jest.unmock('validator')
jest.unmock('cpf-cnpj-validator')

const { mockClient } = require('aws-sdk-client-mock')
const { mockLibStorageUpload } = require('aws-sdk-client-mock/libStorage')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const s3Mock = mockClient(S3Client)
mockLibStorageUpload(s3Mock)

const bcrypt = require('bcrypt')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const { join } = require('path')
const MongoHelper = require('../../../src/infra/db/mongodb/mongo-helper')
const env = require('../../../src/main/config/env')
const setupApp = require('../../../src/main/config/app')
const { jwtSecret } = require('../../../src/main/config/env')
const { cpf } = require('cpf-cnpj-validator')

const mockAccount = async (role = 'user') => {
  const hashedPassword = await bcrypt.hash('12345', env.salt)
  const email = 'valid_email@email.com'
  const { insertedId } = await MongoHelper
    .getCollection('accounts')
    .insertOne({
      email,
      name: 'any_name',
      role,
      password: hashedPassword
    })
  const accessToken = await jwt.sign({ id: insertedId }, jwtSecret)
  await MongoHelper
    .getCollection('accounts')
    .updateOne({ _id: insertedId }, { $set: { accessToken } })
  return {
    id: insertedId,
    accessToken,
    email
  }
}

const mockAccountDetails = async () => {
  const { id, accessToken, email } = await mockAccount()
  const accountDetails = makeAccountDetails()
  await MongoHelper
    .getCollection('accounts')
    .updateOne({ _id: id }, { $set: { details: accountDetails } })
  return {
    id,
    accessToken,
    email,
    ...accountDetails
  }
}

const makeAccountDetails = () => ({
  fullName: 'any_name',
  birthDate: '2000-01-01',
  fatherName: 'any_father_name',
  motherName: 'any_mother_name',
  rg: '12934',
  cpf: cpf.generate(),
  address: 'street one, 111',
  city: 'any_city',
  state: 'any_state',
  cep: 'any_cep'
})

describe('Account Routes', () => {
  let app
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany({})
    s3Mock.reset()
  })

  describe('POST /account/details', () => {
    test('Should return 200 on update account', async () => {
      const { accessToken } = await mockAccount()
      await supertest(app)
        .post('/api/account/details')
        .set('x-access-token', accessToken)
        .send(makeAccountDetails())
        .expect(200)
    })

    test('Should return 403 if accessToken is not provided', async () => {
      await mockAccount()
      await supertest(app)
        .post('/api/account/details')
        .send(makeAccountDetails())
        .expect(403)
    })

    test('Should return 400 if invalid data is provided', async () => {
      const { accessToken } = await mockAccount()
      await supertest(app)
        .post('/api/account/details')
        .set('x-access-token', accessToken)
        .send({
          accountId: 'any_id',
          fullName: 'any_name',
          birthDate: '2000-01-01'
        })
        .expect(400)
    })

    test('Should return 400 if an invalid date is provided', async () => {
      const { accessToken } = await mockAccount()
      const details = makeAccountDetails()
      await supertest(app)
        .post('/api/account/details')
        .set('x-access-token', accessToken)
        .send({
          ...details,
          birthDate: 'invalid_date'
        })
        .expect(400)
    })

    test('Should return 400 if an invalid cpf is provided', async () => {
      const { accessToken } = await mockAccount()
      const details = makeAccountDetails()
      await supertest(app)
        .post('/api/account/details')
        .set('x-access-token', accessToken)
        .send({
          ...details,
          cpf: 'invalid_cpf'
        })
        .expect(400)
    })
  })

  describe('GET /account/details', () => {
    test('Should return 200 on load account', async () => {
      const { id, accessToken, ...details } = await mockAccountDetails()
      await supertest(app)
        .get('/api/account/details')
        .set('x-access-token', accessToken)
        .expect(200)
        .expect(details)
    })

    test('Should return 404 if account does not exist ', async () => {
      const { accessToken } = await mockAccount()
      await supertest(app)
        .get('/api/account/details')
        .set('x-access-token', accessToken)
        .expect(404)
        .expect('')
    })

    test('Should return 403 if no accessToken is provided', async () => {
      await mockAccount()
      await supertest(app)
        .get('/api/account/details')
        .expect(403)
    })

    test('Should return 403 if invalid accessToken is provided', async () => {
      await mockAccount()
      await supertest(app)
        .get('/api/account/details')
        .set('x-access-token', '')
        .expect(403)
    })
  })

  describe('POST /account/document', () => {
    test('Should return 204 on update account', async () => {
      const { accessToken } = await mockAccount()
      await supertest(app)
        .post('/api/account/document')
        .set('x-access-token', accessToken)
        .attach('document', join(__dirname, 'testFiles/test.pdf'))
        .expect(204)
        .expect('')
    })

    test('Should return 500 on upload error', async () => {
      const { accessToken } = await mockAccount()
      s3Mock.on(PutObjectCommand).rejects()
      await supertest(app)
        .post('/api/account/document')
        .set('x-access-token', accessToken)
        .attach('document', join(__dirname, 'testFiles/test.pdf'))
        .expect(500)
    })
  })
})
