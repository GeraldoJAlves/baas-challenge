const { RequiredFieldValidation } = require('../../../validation/validators')

module.exports = () => {
  return new RequiredFieldValidation('accountId')
}
