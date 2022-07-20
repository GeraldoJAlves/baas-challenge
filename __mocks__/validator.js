module.exports = {
  isEmailValid: true,
  isDateValid: true,
  isEmail (email) {
    this.email = email
    return this.isEmailValid
  },
  isDate (date, options) {
    this.date = date
    this.options = options
    return this.isDateValid
  }
}
