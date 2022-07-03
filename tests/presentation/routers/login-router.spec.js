const { ServerError, MissingParamError, UnauthorizedError } = require('../../../src/presentation/errors')
const { LoginRouter } = require('../../../src/presentation/routers')

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

const makeAuthUseCaseSpy = () => {
  class AuthUseCase {
    accessToken = 'valid_token'
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  return new AuthUseCase()
}

const makeHttpRequest = () => ({
  body: {
    email: 'valid_email@email.com',
    password: 'valid_password'
  }
})

const makeHttpRequestWithInvalidCredentials = () => ({
  body: {
    email: 'invalid_email@email.com',
    password: 'invalid_password'
  }
})

describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no HttpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid HttpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginRouter()
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid AuthUseCase is provided', async () => {
    const sut = new LoginRouter({})
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = undefined
    const httpRequest = makeHttpRequestWithInvalidCredentials()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 200 when valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequestWithInvalidCredentials()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ accessToken: 'valid_token' })
  })
})
