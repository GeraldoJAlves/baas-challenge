const { cpf } = require('cpf-cnpj-validator')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class CpfValidatorAdapter {
  isValid (cpfNumber) {
    if (!cpfNumber) throw new MissingParamError('cpfNumber')
    return cpf.isValid(cpfNumber)
  }
}
