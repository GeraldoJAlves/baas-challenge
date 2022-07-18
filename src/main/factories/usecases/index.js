const makeAuthUseCase = require('./auth-usecase-factory')
const makeAddAccountUseCase = require('./add-account-usecase-factory')
const makeUpdateAccountDetailsUseCase = require('./update-account-details-usecase-factory')
const makeLoadAccountByTokenUseCase = require('./load-account-by-token-usecase-factory')
const makeLoadAccountDetailsUseCase = require('./load-account-details-usecase-factory')
const makeUploadAccountDocumentUseCase = require('./upload-account-document-usecase-factory')

module.exports = {
  makeAuthUseCase,
  makeAddAccountUseCase,
  makeUpdateAccountDetailsUseCase,
  makeLoadAccountByTokenUseCase,
  makeLoadAccountDetailsUseCase,
  makeUploadAccountDocumentUseCase
}
