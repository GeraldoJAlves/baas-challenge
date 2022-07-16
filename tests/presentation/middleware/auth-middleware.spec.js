const { AccessDeniedError } = require('../../../src/presentation/errors')
const { AuthMiddleware } = require('../../../src/presentation/middlewares')
const HttpHelper = require('../../../src/presentation/helpers/http-helper')

const makeSut = (role = 'user') => {
  const loadAccountByTokenSpy = makeLoadAccountByTokenSpy()
  const sut = new AuthMiddleware({
    loadAccountByToken: loadAccountByTokenSpy,
    role
  })
  return {
    sut,
    loadAccountByTokenSpy
  }
}

const makeLoadAccountByTokenSpy = () => {
  class LoadAccountByToken {
    async load (accessToken, role) {
      this.accessToken = accessToken
      this.role = role
      return this.account
    }
  }

  return new LoadAccountByToken()
}

const makeRequest = () => ({
  accessToken: 'any_token'
})

describe('Auth Middleware', () => {
  test('Should call loadAccountByToken with correct token', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(loadAccountByTokenSpy.accessToken).toBe(request.accessToken)
    expect(loadAccountByTokenSpy.role).toBe('user')
  })

  test('Should return 403 if no token is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if loadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.load = () => { throw new Error() }
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.serverError())
  })
})
