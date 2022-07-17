const { LoadAccountDetailsController } = require('../../../presentation/controllers')
const { makeLoadAccountDetailsUseCase } = require('../usecases')
const makeLoadAccountDetailsValidation = require('./load-account-details-validation-factory')

module.exports = () => {
  return new LoadAccountDetailsController({
    validation: makeLoadAccountDetailsValidation(),
    loadAccountDetailsUseCase: makeLoadAccountDetailsUseCase()
  })
}
