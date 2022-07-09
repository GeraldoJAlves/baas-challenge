const { LoginController } = require('../../../presentation/controllers')

const { makeAuthUseCase } = require('../usecases')
const makeLoginValidation = require('./login-validation-factory')

module.exports = () => {
  return new LoginController({
    authUseCase: makeAuthUseCase(),
    validation: makeLoginValidation()
  })
}
