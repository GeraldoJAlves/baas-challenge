const { AccountMongoRepository, MongoHelper } = require('../../../../src/infra/db/mongodb')

const makeSut = () => {
  const sut = new AccountMongoRepository()
  return { sut }
}

const mockAccount = () => {
  MongoHelper.getCollection('accounts').insertOne({ email: 'valid_email@email.com', name: 'any_name' })
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('loadByEmail()', () => {
    test('Should return null if no user is found', async () => {
      const { sut } = makeSut()
      const user = await sut.loadByEmail('invalid_email@email.com')
      expect(user).toBeNull()
    })

    test('Should return an user if user is found', async () => {
      const { sut } = makeSut()
      mockAccount()
      const user = await sut.loadByEmail('valid_email@email.com')
      expect(user.email).toBe('valid_email@email.com')
    })
  })
})
