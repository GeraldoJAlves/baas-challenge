const { RequiredFieldValidation, ValidationComposite } = require('../../../validation/validators')

module.exports = () => {
  const validations = []
  for (const field of ['fullName', 'birthDate', 'motherName', 'fatherName', 'cpf', 'rg']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
