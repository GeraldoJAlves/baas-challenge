const { cpf } = require('cpf-cnpj-validator')

module.exports = class CpfValidatorAdapter {
  isValid (cpfNumber) {
    return cpf.isValid(cpfNumber)
  }
}
