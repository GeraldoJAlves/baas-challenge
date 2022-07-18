const { MissingParamError } = require('../../presentation/errors')

module.exports = class FileValidation {
  constructor ({ fieldName, mimeType }) {
    this.fieldName = fieldName
    this.mimeType = mimeType
  }

  validate (input) {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
