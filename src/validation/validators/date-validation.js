module.exports = class DateValidation {
  constructor ({
    dateValidator,
    fieldName,
    format
  }) {
    this.dateValidator = dateValidator
    this.fieldName = fieldName
    this.format = format
  }

  validate (input) {
    this.dateValidator.isValid(input[this.fieldName], this.format)
  }
}
