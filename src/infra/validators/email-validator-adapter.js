const validator = require('validator')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class EmailValidatorAdapter {
  isValid (email) {
    if (!email) throw new MissingParamError('email')
    return validator.isEmail(email)
  }
}
