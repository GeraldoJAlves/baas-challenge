const { LoadAccountByTokenUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const loadAccountByTokenRepositorySpy = makeLoadAccountByTokenRepositorySpy()
  const decrypterSpy = makeDecrypterSpy()
  const sut = new LoadAccountByTokenUseCase({
    loadAccountByTokenRepository: loadAccountByTokenRepositorySpy,
    decrypter: decrypterSpy
  })
  return {
    sut,
    loadAccountByTokenRepositorySpy,
    decrypterSpy
  }
}

const makeDecrypterSpy = () => {
  class Decrypter {
    data = {}
    async decrypt (accessToken) {
      this.accessToken = accessToken
      return this.data
    }
  }
  return new Decrypter()
}

const makeLoadAccountByTokenRepositorySpy = () => {
  class LoadAccountByTokenRepository {
    account = {
      id: 'any_id'
    }

    async loadByToken (accessToken, role) {
      this.accessToken = accessToken
      this.role = role
      return this.account
    }
  }
  return new LoadAccountByTokenRepository()
}

describe('Load Account By Token Usecase', () => {
  test('Should call loadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy.accessToken).toBe('any_token')
    expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
  })

  test('Should throw if loadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.loadByToken = async () => { throw new Error() }
    const promise = sut.load('any_token', 'any_role')
    expect(promise).rejects.toThrow()
  })

  test('Should return an account if loadAccountByTokenRepository returns an account', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const response = await sut.load('any_token', 'any_role')
    expect(response).toEqual(loadAccountByTokenRepositorySpy.account)
  })

  test('Should return null if loadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.account = null
    const response = await sut.load('any_token', 'any_role')
    expect(response).toBeNull()
  })

  test('Should call decrypter with correct token', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy.accessToken).toBe('any_token')
  })
})
