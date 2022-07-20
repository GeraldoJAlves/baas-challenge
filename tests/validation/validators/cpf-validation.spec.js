const { InvalidCpfError } = require('../../../src/presentation/errors')
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
    isCpfValid = true
    isValid (cpf) {
      this.cpf = cpf
      return this.isCpfValid
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

  test('Should return an InvalidCpfError if cpfValidator returns false', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.isCpfValid = false
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidCpfError('cpf'))
  })

  test('Should return false if an cpfValidator returns true', () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })

  test('Should return false if input no has field', () => {
    const { sut } = makeSut('other')
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })

  test('Should return false if no input is provided', () => {
    const { sut } = makeSut()
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
