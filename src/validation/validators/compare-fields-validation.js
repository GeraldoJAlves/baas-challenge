const { InvalidParamError, MissingParamError } = require('../../presentation/errors')

module.exports = class CompareFieldsValidation {
  constructor (fieldName, fieldToCompareName) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input) {
    if (input[this.fieldName] === undefined) return new MissingParamError(this.fieldName)
    if (input[this.fieldToCompareName] === undefined) return new MissingParamError(this.fieldToCompareName)
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
