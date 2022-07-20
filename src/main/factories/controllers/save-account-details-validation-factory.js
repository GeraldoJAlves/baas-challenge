const { CpfValidatorAdapter, DateValidatorAdapter } = require('../../../infra/validators')
const {
  RequiredFieldValidation,
  ValidationComposite,
  CpfValidation,
  DateValidation
} = require('../../../validation/validators')

module.exports = () => {
  const validations = []
  for (const fieldName of ['fullName', 'birthDate', 'motherName', 'fatherName', 'cpf', 'rg']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }

  validations.push(new CpfValidation({
    fieldName: 'cpf',
    cpfValidator: new CpfValidatorAdapter()
  }))

  validations.push(new DateValidation({
    fieldName: 'birthDate',
    dateValidator: new DateValidatorAdapter(),
    format: 'YYYY-MM-DD'
  }))

  return new ValidationComposite(validations)
}
