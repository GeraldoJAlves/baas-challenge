const { AccessDeniedError } = require('../../../src/presentation/errors')
const { AuthMiddleware } = require('../../../src/presentation/middlewares')
const HttpHelper = require('../../../src/presentation/helpers/http-helper')

const makeSut = (role = 'user') => {
  const loadAccountByTokenUseCaseSpy = makeLoadAccountByTokenUseCaseSpy()
  const sut = new AuthMiddleware({
    loadAccountByTokenUseCase: loadAccountByTokenUseCaseSpy,
    role
  })
  return {
    sut,
    loadAccountByTokenUseCaseSpy
  }
}

const makeLoadAccountByTokenUseCaseSpy = () => {
  class LoadAccountByTokenUseCase {
    account = {
      id: 'any_id'
    }

    async load (accessToken, role) {
      this.accessToken = accessToken
      this.role = role
      return this.account
    }
  }

  return new LoadAccountByTokenUseCase()
}

const makeRequest = () => ({
  accessToken: 'any_token'
})

describe('Auth Middleware', () => {
  test('Should call loadAccountByToken with correct token', async () => {
    const { sut, loadAccountByTokenUseCaseSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(loadAccountByTokenUseCaseSpy.accessToken).toBe(request.accessToken)
    expect(loadAccountByTokenUseCaseSpy.role).toBe('user')
  })

  test('Should return 403 if no token is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if loadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenUseCaseSpy } = makeSut()
    loadAccountByTokenUseCaseSpy.load = () => { throw new Error() }
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.serverError())
  })

  test('Should return 200 if loadAccountByToken returns a token', async () => {
    const { sut, loadAccountByTokenUseCaseSpy } = makeSut()
    const accountId = loadAccountByTokenUseCaseSpy.account.id
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.ok({ accountId }))
  })

  test('Should return 403 if loadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenUseCaseSpy } = makeSut()
    loadAccountByTokenUseCaseSpy.account = null
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
  })
})
