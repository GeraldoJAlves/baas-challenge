const { InvalidCpfError } = require('../../presentation/errors')

module.exports = class CpfValidation {
  constructor ({ cpfValidator, fieldName }) {
    this.cpfValidator = cpfValidator
    this.fieldName = fieldName
  }

  validate (input) {
    if (!this.cpfValidator.isValid(input[this.fieldName])) return new InvalidCpfError(this.fieldName)
  }
}
