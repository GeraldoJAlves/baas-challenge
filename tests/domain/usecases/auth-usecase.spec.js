const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError, InvalidParamError } = require('../../../src/presentation/errors')

const makeSut = () => {
  const {
    loadUserByEmailRepository,
    encrypter,
    tokenGenerator
  } = makeDependencies()
  const sut = new AuthUseCase({
    loadUserByEmailRepository,
    encrypter,
    tokenGenerator
  })
  return {
    sut,
    loadUserByEmailRepositorySpy: loadUserByEmailRepository,
    encrypterSpy: encrypter,
    tokenGeneratorSpy: tokenGenerator
  }
}

const makeDependencies = () => ({
  loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
  encrypter: makeEncrypterSpy(),
  tokenGenerator: makeTokenGeneratorSpy()
})

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    user = {
      id: 'user_id',
      password: 'hashed_password'
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
    isValid = true
    compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  return new EncrypterSpy()
}

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy {
    accessToken = 'any_token'
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  return new TokenGeneratorSpy()
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

  test('Should throw if no dependency is provided', async () => {
    const dependencies = makeDependencies()
    let sut = new AuthUseCase({
      ...dependencies,
      loadUserByEmailRepository: undefined
    })
    let promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new MissingParamError('LoadUserByEmailRepository'))

    sut = new AuthUseCase({
      ...dependencies,
      encrypter: undefined
    })
    promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new MissingParamError('Encrypter'))

    sut = new AuthUseCase({
      ...dependencies,
      tokenGenerator: undefined
    })
    promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new MissingParamError('TokenGenerator'))
  })

  test('Should throw if an invalid dependency is provided', async () => {
    const dependencies = makeDependencies()
    let sut = new AuthUseCase({
      ...dependencies,
      loadUserByEmailRepository: {}
    })
    let promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new InvalidParamError('LoadUserByEmailRepository'))

    sut = new AuthUseCase({
      ...dependencies,
      encrypter: {}
    })
    promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new InvalidParamError('Encrypter'))

    sut = new AuthUseCase({
      ...dependencies,
      tokenGenerator: {}
    })
    promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).rejects.toThrow(new InvalidParamError('TokenGenerator'))
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

  test('Should call TokenGenerator with correct userId', async () => {
    const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should return an accessToken if correct credentials are provided', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const accessToken = await sut.auth('valid_email@email.com', 'valid_password')
    expect(accessToken).toBe(tokenGeneratorSpy.accessToken)
    expect(accessToken).toBeTruthy()
  })
})
