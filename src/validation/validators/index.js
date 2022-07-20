const EmailValidation = require('./email-validation')
const RequiredFieldValidation = require('./required-field-validation')
const ValidationComposite = require('./validation-composite')
const CompareFieldsValidation = require('./compare-fields-validation')
const FileValidation = require('./file-validation')
const CpfValidation = require('./cpf-validation')

module.exports = {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
  FileValidation,
  CpfValidation
}
