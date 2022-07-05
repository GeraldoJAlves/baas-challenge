const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError } = require('../../../src/presentation/errors')

const makeSut = () => {
  const {
    loadUserByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  } = makeDependencies()
  const sut = new AuthUseCase({
    loadUserByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  })
  return {
    sut,
    loadUserByEmailRepositorySpy: loadUserByEmailRepository,
    hashComparerSpy: hashComparer,
    encrypterSpy: encrypter,
    updateAccessTokenRepositorySpy: updateAccessTokenRepository
  }
}

const makeDependencies = () => ({
  loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
  hashComparer: makeHashComparerSpy(),
  encrypter: makeEncrypterSpy(),
  updateAccessTokenRepository: makeUpdateAccessTokenRepositorySpy()
})

const makeDependenciesThrowError = () => ({
  loadUserByEmailRepository: makeLoadUserByEmailRepositoryThrowError(),
  hashComparer: makeHashComparerThrowError(),
  encrypter: makeEncrypterThrowError(),
  updateAccessTokenRepository: makeUpdateAccessTokenRepositoryThrowError()
})

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    user = {
      id: 'user_id',
      password: 'hashed_password'
    }

    async loadByEmail (email) {
      this.email = email
      return this.user
    }
  }
  return new LoadUserByEmailRepositorySpy()
}

const makeLoadUserByEmailRepositoryThrowError = () => {
  class LoadUserByEmailRepositorySpy {
    async loadByEmail () {
      throw new Error()
    }
  }
  return new LoadUserByEmailRepositorySpy()
}

const makeEncrypterSpy = () => {
  class EncrypterSpy {
    accessToken = 'any_token'
    async encrypt (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  return new EncrypterSpy()
}

const makeEncrypterThrowError = () => {
  class EncrypterSpy {
    async encrypt () {
      throw new Error()
    }
  }
  return new EncrypterSpy()
}

const makeHashComparerSpy = () => {
  class HashComparerSpy {
    isValid = true
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  return new HashComparerSpy()
}

const makeHashComparerThrowError = () => {
  class HashComparerSpy {
    async compare () {
      throw new Error()
    }
  }
  return new HashComparerSpy()
}

const makeUpdateAccessTokenRepositorySpy = () => {
  class UpdateAccessTokenRepositorySpy {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeUpdateAccessTokenRepositoryThrowError = () => {
  class UpdateAccessTokenRepositorySpy {
    async update () {
      throw new Error()
    }
  }
  return new UpdateAccessTokenRepositorySpy()
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

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(hashComparerSpy.password).toBe('any_password')
    expect(hashComparerSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const accessToken = await sut.auth('valid_email@email.com', 'any_password')
    expect(accessToken).toBeFalsy()
  })

  test('Should call Encrypter with correct userId', async () => {
    const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'any_password')
    expect(encrypterSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should return an accessToken if correct credentials are provided', async () => {
    const { sut, encrypterSpy } = makeSut()
    const accessToken = await sut.auth('valid_email@email.com', 'valid_password')
    expect(accessToken).toBe(encrypterSpy.accessToken)
    expect(accessToken).toBeTruthy()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, encrypterSpy, loadUserByEmailRepositorySpy, updateAccessTokenRepositorySpy } = makeSut()
    await sut.auth('valid_email@email.com', 'valid_password')
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(encrypterSpy.accessToken)
    expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })
})
