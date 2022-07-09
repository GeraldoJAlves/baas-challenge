const { HttpHelper } = require('../helpers')

module.exports = class SignupController {
  constructor ({ addAccountUseCase } = {}) {
    this.addAccountUseCase = addAccountUseCase
  }

  async handle (httpRequest) {
    try {
      const { name, email, password } = httpRequest.body
      await this.addAccountUseCase.add({ name, email, password })
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
