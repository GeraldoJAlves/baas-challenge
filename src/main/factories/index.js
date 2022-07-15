const makeSignupController = require('./controllers/signup-controller-factory')
const makeLoginController = require('./controllers/login-controller-factory')
const makeAccountDetails = require('./controllers/account-details-controller-factory')

module.exports = {
  makeLoginController,
  makeSignupController,
  makeAccountDetails
}
