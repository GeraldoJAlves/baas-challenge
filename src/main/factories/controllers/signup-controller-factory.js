const { SignupController } = require('../../../presentation/controllers')

const makeSignupValidation = require('./signup-validation-factory')
const { makeAddAccountUseCase, makeAuthUseCase } = require('../usecases')

module.exports = () => {
  return new SignupController({
    addAccountUseCase: makeAddAccountUseCase(),
    validation: makeSignupValidation(),
    authUseCase: makeAuthUseCase()
  })
}
