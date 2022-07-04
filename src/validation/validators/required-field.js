const { MissingParamError } = require('../../presentation/errors')

module.exports = class RequiredField {
  constructor (fieldName) {
    this.fieldName = fieldName
  }

  validate (input) {
    if (!input || !input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
