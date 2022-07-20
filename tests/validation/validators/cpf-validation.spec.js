const { CpfValidation } = require('../../../src/validation/validators')

const makeSut = (fieldName = 'cpf') => {
  const cpfValidatorSpy = makeCpfValidatorSpy()
  const sut = new CpfValidation({
    fieldName,
    cpfValidator: cpfValidatorSpy
  })
  return {
    sut,
    cpfValidatorSpy
  }
}

const makeCpfValidatorSpy = () => {
  class CpfValidator {
    isValidCpf = true
    isValid (cpf) {
      this.cpf = cpf
      return this.isValidCpf
    }
  }
  return new CpfValidator()
}

const makeInput = () => ({
  cpf: 'any_cpf'
})

describe('Cpf Validation', () => {
  test('Should call cpfValidator with correct value', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    const input = makeInput()
    sut.validate(input)
    expect(cpfValidatorSpy.cpf).toBe(input.cpf)
  })
})
