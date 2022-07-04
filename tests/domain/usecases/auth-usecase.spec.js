const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError, InvalidParamError } = require('../../../src/presentation/errors')

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const encrypterSpy = makeEncrypterSpy()
  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy
  })
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy }
}

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    user = {
      password: 'hash_password'
    }

    async load (email) {
      this.email = email
      return this.user
    }
  }
  return new LoadUserByEmailRepositorySpy()
}

const makeEncrypterSpy = () => {
  class EncrypterSpy {
    compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }
  return new EncrypterSpy()
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase({
      encrypter: makeEncrypterSpy()
    })
    const promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new MissingParamError('LoadUserByEmailRepository'))
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({
      loadUserByEmailRepository: {},
      encrypter: makeEncrypterSpy()
    })
    const promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new InvalidParamError('LoadUserByEmailRepository'))
  })

  test('Should call LoadUserByEmailRepository with correct param', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    sut.auth('any_email@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('any_email@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(encrypterSpy.password).toBe('any_password')
    expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})
