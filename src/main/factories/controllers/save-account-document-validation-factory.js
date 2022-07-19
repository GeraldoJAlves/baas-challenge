const { FileValidation } = require('../../../validation/validators')

module.exports = () => {
  return new FileValidation({
    fieldName: 'document',
    mimeType: 'application/pdf'
  })
}
