const makeAuthUseCase = require('./auth-usecase-factory')
const makeAddAccountUseCase = require('./add-account-usecase-factory')
const makeUpdateAccountDetailsUseCase = require('./update-account-details-usecase-factory')

module.exports = {
  makeAuthUseCase,
  makeAddAccountUseCase,
  makeUpdateAccountDetailsUseCase
}
