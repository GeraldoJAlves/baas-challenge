const { LoadAccountByTokenUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const loadAccountByTokenRepositorySpy = makeLoadAccountByTokenRepositorySpy()
  const sut = new LoadAccountByTokenUseCase({
    loadAccountByTokenRepository: loadAccountByTokenRepositorySpy
  })
  return {
    sut,
    loadAccountByTokenRepositorySpy
  }
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
  test('Shoul call loadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy.accessToken).toBe('any_token')
    expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
  })

  test('Shoul throw if loadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.loadByToken = async () => { throw new Error() }
    const promise = sut.load('any_token', 'any_role')
    expect(promise).rejects.toThrow()
  })
})
