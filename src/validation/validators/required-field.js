const { MissingParamError } = require('../../presentation/errors')

module.exports = class RequiredField {
  constructor (fieldName) {
    this.fieldName = fieldName
  }

  validate (input) {
    if (input[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName)
    }
  }
}
