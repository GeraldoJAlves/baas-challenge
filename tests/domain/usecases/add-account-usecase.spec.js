const { AddAccountUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const checkAccountByEmailRepositorySpy = makeCheckAccountByEmailRepositorySpy()
  const hasherSpy = makeHasherSpy()
  const sut = new AddAccountUseCase({
    checkAccountByEmailRepository: checkAccountByEmailRepositorySpy,
    hasher: hasherSpy
  })
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy
  }
}

const makeCheckAccountByEmailRepositorySpy = () => {
  class CheckAccountByEmailRepository {
    checkByEmail (email) {
      this.email = email
      return this.exists
    }
  }
  return new CheckAccountByEmailRepository()
}

const makeHasherSpy = () => {
  class Hasher {
    encryptedHash = 'encrypted_hash'
    async hash (password) {
      this.password = password
      return this.encryptedHash
    }
  }
  return new Hasher()
}

describe('Add Account Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      name: 'any_name',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      email: 'any_email@email.com',
      password: 'any_password'
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

  test('Should throw if no checkAccountByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if an invalid checkAccountByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase({})
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call checkAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(checkAccountByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should return false if checkAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.exists = true
    const isValid = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(isValid).toBeFalsy()
  })

  test('Should call hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(hasherSpy.password).toBe('any_password')
  })
})
