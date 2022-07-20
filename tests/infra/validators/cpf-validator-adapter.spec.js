
const { cpf } = require('cpf-cnpj-validator')
const { CpfValidatorAdapter } = require('../../../src/infra/validators')

const makeSut = () => {
  const sut = new CpfValidatorAdapter()
  return { sut }
}

describe('Cpf Validator', () => {
  beforeEach(() => {
    cpf.validNumber = true
  })

  test('Should call cpf-cnpj-validator with correct value', () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    sut.isValid(cpfNumber)
    expect(cpf.value).toBe(cpfNumber)
  })

  test('Should return true if cpf-cnpj-validator returns true', () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    const isValid = sut.isValid(cpfNumber)
    expect(isValid).toBeTruthy()
  })

  test('Should return false if cpf-cnpj-validator returns false', () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    cpf.validNumber = false
    const isValid = sut.isValid(cpfNumber)
    expect(isValid).toBeFalsy()
  })

  test('Should throw if no cpf is provided', () => {
    const { sut } = makeSut()
    expect(() => { sut.isValid() }).toThrow()
  })

  test('Should throw if cpf-cnpj-validator throws', () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    cpf.isValid = () => { throw new Error() }
    expect(() => { sut.isValid(cpfNumber) }).toThrow()
  })
})
