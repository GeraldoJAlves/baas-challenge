const AccountDetailsController = require('../../../presentation/controllers/account-details-controller')
const { makeUpdateAccountDetailsUseCase } = require('../usecases')
const makeAccountDetailsValidation = require('./account-details-validation-factory')

module.exports = () => {
  const updateAccountDetailsUseCase = makeUpdateAccountDetailsUseCase()
  const validation = makeAccountDetailsValidation()
  return new AccountDetailsController({
    updateAccountDetailsUseCase,
    validation
  })
}
