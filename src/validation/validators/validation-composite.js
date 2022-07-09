const { MissingParamError } = require('../../presentation/errors')

module.exports = class ValidationComposite {
  constructor (validations) {
    this.validations = validations
  }

  validate (input) {
    if (!this.validations || this.validations.length === 0) throw new MissingParamError('validations')
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
