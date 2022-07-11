const { AccountDetailsController } = require('../../../src/presentation/controllers')
const { MissingParamError } = require('../../../src/presentation/errors')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const validationSpy = makeValidationSpy()
  const updateAccountDetailsUseCaseSpy = makeUpdateAccountDetailsUseCaseSpy()
  const sut = new AccountDetailsController({
    validation: validationSpy,
    updateAccountDetailsUseCase: updateAccountDetailsUseCaseSpy
  })
  return {
    sut,
    validationSpy,
    updateAccountDetailsUseCaseSpy
  }
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

const makeUpdateAccountDetailsUseCaseSpy = () => {
  class UpdateAccountDetailsUseCase {
    isValid = true
    updateAccountDetails (data) {
      this.data = data
      return this.isValid
    }
  }
  return new UpdateAccountDetailsUseCase()
}

const makeHttpRequest = () => ({
  body: {
    fullName: 'any_name',
    birthDate: '2000-01-01',
    fatherName: 'any_father_name',
    motherName: 'any_mother_name',
    rg: '12934',
    cpf: '1234590',
    address: 'street one, 111',
    city: 'any_city',
    state: 'any_state',
    cep: 'any_cep'
  }
})

describe('Account Details Controller', () => {
  test('Should call validation with correct input', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('fullName')
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.badRequest(validationSpy.error))
  })

  test('Should return 500 if validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.validate = () => { throw new Error() }
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if no validation is provided', async () => {
    const sut = new AccountDetailsController({
      updateAccountDetailsUseCase: makeUpdateAccountDetailsUseCaseSpy()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if an invalid validation is provided', async () => {
    const sut = new AccountDetailsController({
      validation: {},
      updateAccountDetailsUseCase: makeUpdateAccountDetailsUseCaseSpy()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should call updateAccountDetailsUseCase with correct values', async () => {
    const { sut, updateAccountDetailsUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(updateAccountDetailsUseCaseSpy.data).toEqual(httpRequest.body)
  })

  test('Should return 500 if updateAccountDetailsUseCase throws', async () => {
    const { sut, updateAccountDetailsUseCaseSpy } = makeSut()
    updateAccountDetailsUseCaseSpy.updateAccountDetails = () => { throw new Error() }
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if no updateAccountDetailsUseCase is provided', async () => {
    const sut = new AccountDetailsController({
      validation: makeValidationSpy()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if an invalid updateAccountDetailsUseCase is provided', async () => {
    const sut = new AccountDetailsController({
      validation: makeValidationSpy(),
      updateAccountDetailsUseCase: {}
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })
})
