const { AccountMongoRepository, MongoHelper } = require('../../../../src/infra/db/mongodb')

const makeSut = () => {
  const sut = new AccountMongoRepository()
  return { sut }
}

const mockAccount = async (role = 'user') => {
  const fakeAccount = { accessToken: 'any_token', role, email: 'valid_email@email.com', name: 'any_name', password: 'hashed_password' }
  await MongoHelper.getCollection('accounts').insertOne(fakeAccount)
  return MongoHelper.map(fakeAccount)
}

const makeAccountDetails = () => ({
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

  describe('checkByEmail()', () => {
    test('Should return false if no user is found', async () => {
      const { sut } = makeSut()
      const user = await sut.checkByEmail('unknown_email@email.com')
      expect(user).toBeFalsy()
    })

    test('Should return true if user is found', async () => {
      const { sut } = makeSut()
      await mockAccount()
      const user = await sut.checkByEmail('valid_email@email.com')
      expect(user).toBeTruthy()
    })

    test('Should throw if no email is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.checkByEmail()
      expect(promise).rejects.toThrow()
    })
  })

  describe('add()', () => {
    test('Should throw if no email is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.add({
        name: 'any_name',
        password: 'hashed_password'
      })
      expect(promise).rejects.toThrow()
    })

    test('Should throw if no name is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.add({
        email: 'any_email@email.com',
        password: 'hashed_password'
      })
      expect(promise).rejects.toThrow()
    })

    test('Should throw if no password is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.add({
        email: 'any_email@email.com',
        name: 'any_name'
      })
      expect(promise).rejects.toThrow()
    })

    test('Should insert account if valid params are provided', async () => {
      const { sut } = makeSut()
      await sut.add({
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'hashed_password'
      })
      const account = await MongoHelper.getCollection('accounts').findOne({ email: 'any_email@email.com' })
      expect(account).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('hashed_password')
    })

    test('Should return true if account is inserted', async () => {
      const { sut } = makeSut()
      const isValid = await sut.add({
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'hashed_password'
      })
      expect(isValid).toBeTruthy()
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

    test('Should update the account with the given token', async () => {
      const { sut } = makeSut()
      const { id } = await mockAccount()
      await sut.updateAccessToken(id, 'valid_token')

      const account = await MongoHelper.getCollection('accounts').findOne({ _id: id })
      expect(account.accessToken).toBe('valid_token')
    })
  })

  describe('updateDetails()', () => {
    test('Should update the acount with the details', async () => {
      const { sut } = makeSut()
      const { id } = await mockAccount()
      const data = makeAccountDetails()
      await sut.updateDetails(id, data)
      const account = await MongoHelper.getCollection('accounts').findOne({ _id: id })
      expect(account.details).toEqual(data)
    })

    test('Should throw if no id is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.updateDetails()
      expect(promise).rejects.toThrow()
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account if token belongs to role', async () => {
      const { sut } = makeSut()
      const { id } = await mockAccount()
      const account = await sut.loadByToken('any_token', 'user')
      expect(account).toEqual({ id })
    })

    test('Should return an account if account role has less privileges', async () => {
      const { sut } = makeSut()
      const { id } = await mockAccount()
      let account = await sut.loadByToken('any_token', 'admin')
      expect(account).toEqual({ id })
      account = await sut.loadByToken('any_token', 'userAccount')
      expect(account).toEqual({ id })
    })
  })
})
