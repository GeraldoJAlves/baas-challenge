const { AccountMongoRepository, MongoHelper } = require('../../../../src/infra/db/mongodb')

const makeSut = () => {
  const sut = new AccountMongoRepository()
  return { sut }
}

const mockAccount = async () => {
  const fakeAccount = { email: 'valid_email@email.com', name: 'any_name', password: 'hashed_password' }
  await MongoHelper.getCollection('accounts').insertOne(fakeAccount)
  return MongoHelper.map(fakeAccount)
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany()
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
      const { id, name, password } = await mockAccount()
      const account = await sut.loadByEmail('valid_email@email.com')
      expect(account).toEqual({ id, name, password })
    })

    test('Should throw if no email is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.loadByEmail()
      expect(promise).rejects.toThrow()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should throw if no id is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.updateAccessToken()
      expect(promise).rejects.toThrow()
    })

    test('Should throw if no token is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.updateAccessToken('any_id')
      expect(promise).rejects.toThrow()
    })
  })
})
