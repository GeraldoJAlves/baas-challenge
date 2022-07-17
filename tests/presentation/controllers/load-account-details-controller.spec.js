const { LoadAccountDetailsController } = require('../../../src/presentation/controllers')
const { MissingParamError } = require('../../../src/presentation/errors')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const loadAccountDetailsUseCaseSpy = makeLoadAccountDetailsUseCaseSpy()
  const validationSpy = makeValidationSpy()
  const sut = new LoadAccountDetailsController({
    loadAccountDetailsUseCase: loadAccountDetailsUseCaseSpy,
    validation: validationSpy
  })
  return {
    sut,
    validationSpy,
    loadAccountDetailsUseCaseSpy
  }
}

const makeLoadAccountDetailsUseCaseSpy = () => {
  class LoadAccountDetailsUseCase {
    account = {
      fullName: 'any_fullname',
      birthDate: 'any_birthdate',
      motherName: 'any_mothername',
      fatherName: 'any_fathername'
    }

    async load (accountId) {
      this.accountId = accountId
      return this.account
    }
  }
  return new LoadAccountDetailsUseCase()
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

describe('Load Account Details Controller', () => {
  test('Should call loadAccountDetailsUseCase with correct accountId', async () => {
    const { sut, loadAccountDetailsUseCaseSpy } = makeSut()
    await sut.handle({
      accountId: 'any_id'
    })
    expect(loadAccountDetailsUseCaseSpy.accountId).toBe('any_id')
  })

  test('Should return 500 if loadAccountDetailsUseCase throws', async () => {
    const { sut, loadAccountDetailsUseCaseSpy } = makeSut()
    loadAccountDetailsUseCaseSpy.load = async () => { throw new Error() }
    const response = await sut.handle({
      accountId: 'any_id'
    })
    expect(response).toEqual(HttpHelper.serverError())
  })

  test('Should return 200 if loadAccountDetailsUseCase returns an account', async () => {
    const { sut, loadAccountDetailsUseCaseSpy } = makeSut()
    const response = await sut.handle({
      accountId: 'any_id'
    })
    expect(response).toEqual(HttpHelper.ok(loadAccountDetailsUseCaseSpy.account))
  })

  test('Should return 404 if loadAccountDetailsUseCase returns null', async () => {
    const { sut, loadAccountDetailsUseCaseSpy } = makeSut()
    loadAccountDetailsUseCaseSpy.account = null
    const response = await sut.handle({
      accountId: 'any_id'
    })
    expect(response).toEqual(HttpHelper.notFound())
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = {
      accountId: 'any_id'
    }
    await sut.handle(request)
    expect(validationSpy.input).toBe(request)
  })

  test('Should return 400 validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('accountId')
    const request = {
      accountId: 'any_id'
    }
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.badRequest(validationSpy.error))
  })
})
