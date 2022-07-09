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
      await this.addAccountUseCase.add({ name, email, password })
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}