jest.unmock('bcrypt')
jest.unmock('jsonwebtoken')
jest.unmock('validator')

const MongoHelper = require('../../../src/infra/db/mongodb/mongo-helper')
const setupApp = require('../../../src/main/config/app')
const env = require('../../../src/main/config/env')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../../src/main/config/env')

const mockAccount = async () => {
  const hashedPassword = await bcrypt.hash('12345', env.salt)
  const { insertedId } = await MongoHelper
    .getCollection('accounts')
    .insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      role: 'user',
      password: hashedPassword
    })
  const accessToken = await jwt.sign({ id: insertedId }, jwtSecret)
  await MongoHelper
    .getCollection('accounts')
    .updateOne({ _id: insertedId }, { $set: { accessToken } })
  return {
    accessToken
  }
}

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
  })

  describe('POST /account-details', () => {
    test('Should return 200 on update account', async () => {
      const { accessToken } = await mockAccount()
      await supertest(app)
        .post('/api/account-details')
        .set('x-access-token', accessToken)
        .send({
          fullName: 'any_name',
          birthDate: '2000-01-01',
          fatherName: 'any_father_name',
          motherName: 'any_mother_name',
          rg: '12934',
          cpf: '1234590',
          address: 'street one, 111',
          city: 'any_city',
          state: 'any_state',
          cep: 'any_cep'
        })
        .expect(200)
    })

    test('Should return 403 if accessToken is not provided', async () => {
      await mockAccount()
      await supertest(app)
        .post('/api/account-details')
        .send({
          fullName: 'any_name',
          birthDate: '2000-01-01',
          fatherName: 'any_father_name',
          motherName: 'any_mother_name',
          rg: '12934',
          cpf: '1234590',
          address: 'street one, 111',
          city: 'any_city',
          state: 'any_state',
          cep: 'any_cep'
        })
        .expect(403)
    })

    test('Should return 400 if invalid data is provided', async () => {
      const { accessToken } = await mockAccount()
      await supertest(app)
        .post('/api/account-details')
        .set('x-access-token', accessToken)
        .send({
          accountId: 'any_id',
          fullName: 'any_name',
          birthDate: '2000-01-01'
        })
        .expect(400)
    })
  })
})
