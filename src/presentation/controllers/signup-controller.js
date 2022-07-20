const EmailInUseError = require('../errors/email-in-use-error')
const { HttpHelper } = require('../helpers')

module.exports = class SignupController {
  constructor ({ addAccountUseCase, validation, authUseCase } = {}) {
    this.addAccountUseCase = addAccountUseCase
    this.validation = validation
    this.authUseCase = authUseCase
  }

  async handle (request) {
    try {
      const { name, email, password } = request
      const error = this.validation.validate(request)
      if (error) return HttpHelper.badRequest(error)
      const isValid = await this.addAccountUseCase.add({ name, email, password })
      if (!isValid) return HttpHelper.forbidden(new EmailInUseError())
      const authentication = await this.authUseCase.auth(email, password)
      return HttpHelper.ok(authentication)
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
