const { SignupController } = require('../../../src/presentation/controllers')
const { MissingParamError } = require('../../../src/presentation/errors')
const EmailInUseError = require('../../../src/presentation/errors/email-in-use-error')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const addAccountUseCaseSpy = makeAddAccountUseCaseSpy()
  const validationSpy = makeValidationSpy()
  const authUseCaseSpy = makeAuthUseCaseSpy()
  const sut = new SignupController({
    addAccountUseCase: addAccountUseCaseSpy,
    validation: validationSpy,
    authUseCase: authUseCaseSpy
  })
  return {
    sut,
    addAccountUseCaseSpy,
    authUseCaseSpy,
    validationSpy
  }
}

const makeAddAccountUseCaseSpy = () => {
  class AddAccountUseCase {
    isValid = true
    async add ({ name, email, password }) {
      this.name = name
      this.email = email
      this.password = password
      return this.isValid
    }
  }
  return new AddAccountUseCase()
}

const makeAuthUseCaseSpy = () => {
  class AuthUseCase {
    accessToken = 'valid_token'
    async auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  return new AuthUseCase()
}

const makeValidationSpy = () => {
  class Validation {
    validate (input) {
      this.input = input
      return this.error
    }
  }
  return new Validation()
}

const makeHttpRequest = () => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

describe('Signup Controller', () => {
  test('Should call addAccountUseCase with correct values', async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(addAccountUseCaseSpy.name).toBe(httpRequest.body.name)
    expect(addAccountUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(addAccountUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 403 if addAccountUseCase returns false', async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    addAccountUseCaseSpy.isValid = false
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(HttpHelper.forbidden(new EmailInUseError()))
  })

  test('Should return 500 if no addAccountUseCase is provided', async () => {
    const sut = new SignupController({
      validation: makeValidationSpy()
    })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if no dependencies are provided', async () => {
    const sut = new SignupController()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if an invalid addAccountUseCase is provided', async () => {
    const sut = new SignupController({
      validation: makeValidationSpy(),
      addAccountUseCase: {}
    })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toBe(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('email')
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.badRequest(validationSpy.error))
  })

  test('Should return 500 if no validation is provided', async () => {
    const sut = new SignupController({
      addAccountUseCase: makeAddAccountUseCaseSpy()
    })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if an invalid validation is provided', async () => {
    const sut = new SignupController({
      addAccountUseCase: makeAddAccountUseCaseSpy(),
      validation: {}
    })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should call authUseCase with correct values', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
})
