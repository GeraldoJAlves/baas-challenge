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
  test('Should throw if any validation throws', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].validate = () => { throw new Error() }
    expect(() => { sut.validate({ field: 'any_data' }) }).toThrow()
  })

  test('Should throw if no validations are provided', () => {
    const sut = new ValidationComposite([])
    expect(() => { sut.validate({ field: 'any_data' }) }).toThrow()
  })

  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new Error('invalid field')
    const error = sut.validate({ field: 'any_data' })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_data' })
    expect(error).toBeFalsy()
  })

  test('Should call validations with correct input', () => {
    const { sut, validationSpies } = makeSut()
    const input = { field: 'any_data' }
    sut.validate(input)
    expect(validationSpies[0].input).toEqual(input)
    expect(validationSpies[1].input).toEqual(input)
  })
})
