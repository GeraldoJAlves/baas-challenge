const MongoHelper = require('../../../src/infra/db/mongodb/mongo-helper')
const setupApp = require('../../../src/main/config/app')
const env = require('../../../src/main/config/env')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

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
      const hashedPassword = await bcrypt.hash('12345', env.salt)
      await MongoHelper
        .getCollection('accounts')
        .insertOne({
          _id: 'any_id',
          email: 'valid_email@email.com',
          name: 'any_name',
          password: hashedPassword
        })
      await supertest(app)
        .post('/api/account-details')
        .send({
          accountId: 'any_id',
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

    test('Should return 400 if invalid data is provided', async () => {
      const hashedPassword = await bcrypt.hash('12345', env.salt)
      await MongoHelper
        .getCollection('accounts')
        .insertOne({
          _id: 'any_id',
          email: 'valid_email@email.com',
          name: 'any_name',
          password: hashedPassword
        })
      await supertest(app)
        .post('/api/account-details')
        .send({
          accountId: 'any_id',
          fullName: 'any_name',
          birthDate: '2000-01-01'
        })
        .expect(400)
    })
  })
})
