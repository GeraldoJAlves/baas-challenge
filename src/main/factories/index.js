const makeSignupController = require('./controllers/signup-controller-factory')
const makeLoginController = require('./controllers/login-controller-factory')

module.exports = {
  makeLoginController,
  makeSignupController
}
