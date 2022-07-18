const makeSignupController = require('./controllers/signup-controller-factory')
const makeLoginController = require('./controllers/login-controller-factory')
const makeSaveAccountDetailsController = require('./controllers/save-account-details-controller-factory')
const makeAuthMiddleware = require('./middlewares/auth-middleware-factory')
const makeLoadAccountDetailsController = require('./controllers/load-account-details-controller-factory')
const makeSaveAccountDocumentController = require('./controllers/save-account-details-controller-factory')

module.exports = {
  makeLoginController,
  makeSignupController,
  makeAuthMiddleware,
  makeSaveAccountDetailsController,
  makeLoadAccountDetailsController,
  makeSaveAccountDocumentController
}
