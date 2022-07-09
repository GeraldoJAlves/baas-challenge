const EmailInUseError = require('../errors/email-in-use-error')
const { HttpHelper } = require('../helpers')

module.exports = class SignupController {
  constructor ({ addAccountUseCase, validation } = {}) {
    this.addAccountUseCase = addAccountUseCase
    this.validation = validation
  }

  async handle (httpRequest) {
    try {
      const { name, email, password } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)
      if (error) return HttpHelper.badRequest(error)
      const isValid = await this.addAccountUseCase.add({ name, email, password })
      if (!isValid) return HttpHelper.forbidden(new EmailInUseError())
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
