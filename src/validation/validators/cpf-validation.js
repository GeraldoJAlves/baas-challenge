module.exports = class CpfValidation {
  constructor ({ cpfValidator, fieldName }) {
    this.cpfValidator = cpfValidator
    this.fieldName = fieldName
  }

  validate (input) {
    this.cpfValidator.isValid(input[this.fieldName])
  }
}
