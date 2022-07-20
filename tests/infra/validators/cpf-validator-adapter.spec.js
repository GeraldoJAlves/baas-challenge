
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

  test('Should call cpf-cnpj-validator with correct value', async () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    await sut.isValid(cpfNumber)
    expect(cpf.value).toBe(cpfNumber)
  })

  test('Should return true if cpf-cnpj-validator returns true', async () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    const isValid = await sut.isValid(cpfNumber)
    expect(isValid).toBeTruthy()
  })

  test('Should return false if cpf-cnpj-validator returns false', async () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    cpf.validNumber = false
    const isValid = await sut.isValid(cpfNumber)
    expect(isValid).toBeFalsy()
  })
})
