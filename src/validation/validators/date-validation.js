const { InvalidDateError } = require('../../presentation/errors')

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

  validate (input = {}) {
    if (!this.dateValidator.isValid(input[this.fieldName], this.format)) return new InvalidDateError(this.fieldName)
  }
}
