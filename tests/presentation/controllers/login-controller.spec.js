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
    authentication = { accessToken: 'valid_token', name: 'any_name' }
    auth (email, password) {
      this.email = email
      this.password = password
      return this.authentication
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

const makeRequest = () => ({
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeRequestWithInvalidCredentials = () => ({
  email: 'invalid_email@email.com',
  password: 'invalid_password'
})

describe('Login Controller', () => {
  test('Should return 500 if no request is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginController({
      validation: makeValidationSpy()
    })
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid AuthUseCase is provided', async () => {
    const sut = new LoginController({
      authUseCase: {},
      validation: makeValidationSpy()
    })
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no Validation is provided', async () => {
    const sut = new LoginController({
      authUseCase: makeAuthUseCaseSpy()
    })
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid Validation is provided', async () => {
    const sut = new LoginController({
      authUseCase: makeAuthUseCaseSpy(),
      validation: {}
    })
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no dependencies are provided', async () => {
    const sut = new LoginController()
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(authUseCaseSpy.email).toBe(request.email)
    expect(authUseCaseSpy.password).toBe(request.password)
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.authentication = null
    const request = makeRequestWithInvalidCredentials()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 200 when valid credentials are provided', async () => {
    const { sut } = makeSut()
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ accessToken: 'valid_token', name: 'any_name' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const request = makeRequest()
    validationSpy.error = new InvalidParamError('param')
    let httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    validationSpy.error = new MissingParamError('param')
    httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should call Validation with correct params', async () => {
    const { sut, validationSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
