const validator = require('validator')

module.exports = class EmailValidatorAdapter {
  isValid (email) {
    return validator.isEmail(email)
  }
}
