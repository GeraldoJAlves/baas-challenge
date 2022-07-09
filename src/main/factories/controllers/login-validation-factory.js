const { EmailValidatorAdapter } = require('../../../infra/validators')
const { RequiredField, EmailValidation, ValidationComposite } = require('../../../validation/validators')

module.exports = () => {
  const validations = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredField(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
