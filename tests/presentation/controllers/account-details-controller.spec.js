const { AccountDetailsController } = require('../../../src/presentation/controllers')

const makeSut = () => {
  const validationSpy = makeValidationSpy()
  const sut = new AccountDetailsController({
    validation: validationSpy
  })
  return {
    sut,
    validationSpy
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
})
