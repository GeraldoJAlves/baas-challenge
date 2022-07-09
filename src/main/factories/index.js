const makeAuthentication = require('./usecases/authentication-factory')
const makeLoginValidation = require('./controllers/login-validation-factory')
const makeLoginController = require('./controllers/login-controller-factory')

module.exports = {
  makeLoginController,
  makeAuthentication,
  makeLoginValidation
}
