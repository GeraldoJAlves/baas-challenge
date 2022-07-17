const { SaveAccountDetailsController } = require('../../../presentation/controllers')
const { makeUpdateAccountDetailsUseCase } = require('../usecases')
const makeSaveAccountDetailsValidation = require('./save-account-details-validation-factory')

module.exports = () => {
  const updateAccountDetailsUseCase = makeUpdateAccountDetailsUseCase()
  const validation = makeSaveAccountDetailsValidation()
  return new SaveAccountDetailsController({
    updateAccountDetailsUseCase,
    validation
  })
}
