const makeSignupController = require('./controllers/signup-controller-factory')
const makeLoginController = require('./controllers/login-controller-factory')
const makeSaveAccountDetailsController = require('./controllers/save-account-details-controller-factory')
const makeAuthMiddleware = require('./middlewares/auth-middleware-factory')

module.exports = {
  makeLoginController,
  makeSignupController,
  makeAuthMiddleware,
  makeSaveAccountDetailsController
}
