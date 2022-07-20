
const { cpf } = require('cpf-cnpj-validator')
const { CpfValidatorAdapter } = require('../../../src/infra/validators')

const makeSut = () => {
  const sut = new CpfValidatorAdapter()
  return { sut }
}

describe('Cpf Validator', () => {
  test('Should call cpf-cnpj-validator with correct value', async () => {
    const { sut } = makeSut()
    const cpfNumber = '164849165'
    await sut.isValid(cpfNumber)
    expect(cpf.value).toBe(cpfNumber)
  })
})
