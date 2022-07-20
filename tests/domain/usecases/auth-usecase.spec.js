const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError } = require('../../../src/presentation/errors')

const makeSut = () => {
  const {
    loadAccountByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  } = makeDependencies()
  const sut = new AuthUseCase({
    loadAccountByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  })
  return {
    sut,
    loadAccountByEmailRepositorySpy: loadAccountByEmailRepository,
    hashComparerSpy: hashComparer,
    encrypterSpy: encrypter,
    updateAccessTokenRepositorySpy: updateAccessTokenRepository
  }
}

const makeDependencies = () => ({
  loadAccountByEmailRepository: makeloadAccountByEmailRepositorySpy(),
  hashComparer: makeHashComparerSpy(),
  encrypter: makeEncrypterSpy(),
  updateAccessTokenRepository: makeUpdateAccessTokenRepositorySpy()
})

const makeDependenciesThrowError = () => ({
  loadAccountByEmailRepository: makeloadAccountByEmailRepositoryThrowError(),
  hashComparer: makeHashComparerThrowError(),
  encrypter: makeEncrypterThrowError(),
  updateAccessTokenRepository: makeUpdateAccessTokenRepositoryThrowError()
})

const makeloadAccountByEmailRepositorySpy = () => {
  class LoadAccountByEmailRepository {
    account = {
      id: 'user_id',
      name: 'any_name',
      password: 'hashed_password'
    }

    async loadByEmail (email) {
      this.email = email
      return this.account
    }
  }
  return new LoadAccountByEmailRepository()
}

const makeloadAccountByEmailRepositoryThrowError = () => {
  class LoadAccountByEmailRepository {
    async loadByEmail () {
      throw new Error()
    }
  }
  return new LoadAccountByEmailRepository()
}

const makeEncrypterSpy = () => {
  class Encrypter {
    accessToken = 'any_token'
    async encrypt (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  return new Encrypter()
}

const makeEncrypterThrowError = () => {
  class Encrypter {
    async encrypt () {
      throw new Error()
    }
  }
  return new Encrypter()
}

const makeHashComparerSpy = () => {
  class HashComparer {
    isValid = true
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  return new HashComparer()
}

const makeHashComparerThrowError = () => {
  class HashComparer {
    async compare () {
      throw new Error()
    }
  }
  return new HashComparer()
}

const makeUpdateAccessTokenRepositorySpy = () => {
  class UpdateAccessTokenRepository {
    async updateAccessToken (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepository()
}

const makeUpdateAccessTokenRepositoryThrowError = () => {
  class UpdateAccessTokenRepository {
    async updateAccessToken () {
      throw new Error()
    }
  }
  return new UpdateAccessTokenRepository()
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
    for (const dependency in dependencies) {
      const sut = new AuthUseCase({
        ...dependencies,
        [dependency]: undefined
      })
      const promise = sut.auth('any_email@email.com', 'any_password')
      expect(promise).rejects.toThrow()
    }
  })

  test('Should throw if an invalid dependency is provided', async () => {
    const dependencies = makeDependencies()
    for (const dependency in dependencies) {
      const sut = new AuthUseCase({
        ...dependencies,
        [dependency]: {}
      })
      const promise = sut.auth('any_email@email.com', 'any_password')
      expect(promise).rejects.toThrow()
    }
  })

  test('Should throw if dependency throws', async () => {
    const dependenciesThrowError = makeDependenciesThrowError()
    const dependencies = makeDependencies()
    for (const dependency in dependencies) {
      const sut = new AuthUseCase({
        ...dependencies,
        [dependency]: dependenciesThrowError[dependency]
      })
      const promise = sut.auth('any_email@email.com', 'any_password')
      expect(promise).rejects.toThrow()
    }
  })

  test('Should call loadAccountByEmailRepository with correct param', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    sut.auth('any_email@email.com', 'any_password')
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should return null if loadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.account = null
    const authentication = await sut.auth('any_email@email.com', 'any_password')
    expect(authentication).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(hashComparerSpy.password).toBe('any_password')
    expect(hashComparerSpy.hashedPassword).toBe(loadAccountByEmailRepositorySpy.account.password)
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const authentication = await sut.auth('valid_email@email.com', 'any_password')
    expect(authentication).toBeFalsy()
  })

  test('Should call Encrypter with correct userId', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(encrypterSpy.userId).toBe(loadAccountByEmailRepositorySpy.account.id)
  })

  test('Should return an accessToken if correct credentials are provided', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authentication = await sut.auth('valid_email@email.com', 'valid_password')
    expect(authentication.accessToken).toBe(encrypterSpy.accessToken)
    expect(authentication.name).toBe(loadAccountByEmailRepositorySpy.account.name)
    expect(authentication).toBeTruthy()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy, updateAccessTokenRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'valid_password')
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(encrypterSpy.accessToken)
    expect(updateAccessTokenRepositorySpy.userId).toBe(loadAccountByEmailRepositorySpy.account.id)
  })
})
