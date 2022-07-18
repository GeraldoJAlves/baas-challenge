const { FileValidation } = require('../../../validation/validators')

module.exports = () => {
  return new FileValidation('document', 'application/pdf')
}
