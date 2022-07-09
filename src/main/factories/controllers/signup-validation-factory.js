const { EmailValidatorAdapter } = require('../../../infra/validators')
const {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation
} = require('../../../validation/validators')

module.exports = () => {
  const validations = []
  for (const field of ['email', 'name', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validations)
}
