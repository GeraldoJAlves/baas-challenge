module.exports = class EmailValidation {
  constructor (fieldName, emailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input) {
    this.emailValidator.isValid(input[this.fieldName])
  }
}
