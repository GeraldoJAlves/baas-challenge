const validator = require('validator')

module.exports = class DateValidatorAdapter {
  isValid (date, format) {
    validator.isDate(date, {
      format,
      strictMode: true
    })
  }
}
