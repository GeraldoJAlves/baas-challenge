const { ValidationComposite } = require('../../../src/validation/validators')

const makeSut = () => {
  const validations = [
    makeValidationSpy(),
    makeValidationSpy()
  ]
  const sut = new ValidationComposite(validations)
  return {
    sut,
    validationSpies: validations
  }
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

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new Error('invalid field')
    const error = sut.validate({ field: 'any_data' })
    expect(error).toEqual(validationSpies[1].error)
  })
})
