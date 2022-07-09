const makeLoginValidation = require('./login-validation-factory')
const makeAuthentication = require('../usecases/authentication-factory')

const { LoginController } = require('../../../presentation/controllers')

module.exports = () => {
  return new LoginController({
    authUseCase: makeAuthentication(),
    validation: makeLoginValidation()
  })
}
