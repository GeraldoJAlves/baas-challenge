const { SignupController } = require('../../../src/presentation/controllers')
const { MissingParamError } = require('../../../src/presentation/errors')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const addAccountUseCaseSpy = makeAddAccountUseCaseSpy()
  const validationSpy = makeValidationSpy()
  const sut = new SignupController({
    addAccountUseCase: addAccountUseCaseSpy,
    validation: validationSpy
  })
  return {
    sut,
    addAccountUseCaseSpy,
    validationSpy
  }
}

const makeAddAccountUseCaseSpy = () => {
  class AddAccountUseCaseSpy {
    async add ({ name, email, password }) {
      this.name = name
      this.email = email
      this.password = password
      return this.isValid
    }
  }

  return new AddAccountUseCaseSpy()
}

const makeValidationSpy = () => {
  class ValidationSpy {
    validate (input) {
      this.input = input
      return this.error
    }
  }
  return new ValidationSpy()
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

  test('Should return 500 if no addAccountUseCase is provided', async () => {
    const sut = new SignupController()
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if an invalid addAccountUseCase is provided', async () => {
    const sut = new SignupController({
      addAccountUseCase: {}
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
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
})
