jest.unmock('bcrypt')
jest.unmock('jsonwebtoken')
jest.unmock('validator')

const MongoHelper = require('../../../src/infra/db/mongodb/mongo-helper')
const setupApp = require('../../../src/main/config/app')
const env = require('../../../src/main/config/env')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

describe('Login Routes', () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const hashedPassword = await bcrypt.hash('12345', env.salt)
      await MongoHelper
        .getCollection('accounts')
        .insertOne({
          email: 'valid_email@email.com',
          name: 'any_name',
          password: hashedPassword
        })
      await supertest(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: '12345'
        })
        .expect(200)
    })

    test('Should return 401 if wrong password is provided', async () => {
      const hashedPassword = await bcrypt.hash('12345', env.salt)
      await MongoHelper
        .getCollection('accounts')
        .insertOne({
          email: 'valid_email@email.com',
          name: 'any_name',
          password: hashedPassword
        })
      await supertest(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: '123'
        })
        .expect(401)
    })

    test('Should return 401 on login ', async () => {
      await supertest(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: '12345'
        })
        .expect(401)
    })
  })
})
