const { ServerError, UnauthorizedError, InvalidParamError, MissingParamError } = require('../../../src/presentation/errors')
const { LoginController } = require('../../../src/presentation/controllers')

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCaseSpy()
  const validationSpy = makeValidationSpy()
  const sut = new LoginController({
    authUseCase: authUseCaseSpy,
    validation: validationSpy
  })
  return {
    sut,
    authUseCaseSpy,
    validationSpy
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

const makeValidationSpy = () => {
  class Validation {
    error = null
    validate (input) {
      this.input = input
      return this.error
    }
  }
  return new Validation()
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
    const sut = new LoginController({
      validation: makeValidationSpy()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid AuthUseCase is provided', async () => {
    const sut = new LoginController({
      authUseCase: {},
      validation: makeValidationSpy()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no Validation is provided', async () => {
    const sut = new LoginController({
      authUseCase: makeAuthUseCaseSpy()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid Validation is provided', async () => {
    const sut = new LoginController({
      authUseCase: makeAuthUseCaseSpy(),
      validation: {}
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no dependencies are provided', async () => {
    const sut = new LoginController()
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
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ accessToken: 'valid_token' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    validationSpy.error = new InvalidParamError('param')
    let httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    validationSpy.error = new MissingParamError('param')
    httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should call Validation with correct params', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })
})
