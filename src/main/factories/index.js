const makeSignupController = require('./controllers/signup-controller-factory')
const makeLoginController = require('./controllers/login-controller-factory')
const makeAccountDetailsController = require('./controllers/account-details-controller-factory')
const makeAuthMiddleware = require('./middlewares/auth-middleware-factory')

module.exports = {
  makeLoginController,
  makeSignupController,
  makeAuthMiddleware,
  makeAccountDetailsController
}
