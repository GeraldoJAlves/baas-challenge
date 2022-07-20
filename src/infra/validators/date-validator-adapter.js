const validator = require('validator')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class DateValidatorAdapter {
  isValid (date, format = 'YYYY-MM-DD') {
    if (!date) throw new MissingParamError('date')
    return validator.isDate(date, {
      format,
      strictMode: true
    })
  }
}
