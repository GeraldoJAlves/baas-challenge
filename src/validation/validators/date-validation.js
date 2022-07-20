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
    const date = input[this.fieldName]
    if (date && !this.dateValidator.isValid(date, this.format)) return new InvalidDateError(this.fieldName)
  }
}
