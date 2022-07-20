const { CpfValidatorAdapter } = require('../../../infra/validators')
const { RequiredFieldValidation, ValidationComposite, CpfValidation } = require('../../../validation/validators')

module.exports = () => {
  const validations = []
  for (const fieldName of ['fullName', 'birthDate', 'motherName', 'fatherName', 'cpf', 'rg']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }

  validations.push(new CpfValidation({
    fieldName: 'cpf',
    cpfValidator: new CpfValidatorAdapter()
  }))

  return new ValidationComposite(validations)
}
