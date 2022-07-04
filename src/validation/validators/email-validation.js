const { InvalidParamError } = require('../../presentation/errors')

module.exports = class EmailValidation {
  constructor (fieldName, emailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input = {}) {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
