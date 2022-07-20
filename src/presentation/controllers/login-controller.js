const { HttpHelper } = require('../helpers')

module.exports = class LoginController {
  constructor ({ authUseCase, validation } = {}) {
    this.authUseCase = authUseCase
    this.validation = validation
  }

  async handle (request) {
    try {
      const { email, password } = request
      const error = this.validation.validate(request)
      if (error) {
        return HttpHelper.badRequest(error)
      }
      const authentication = await this.authUseCase.auth(email, password)
      if (!authentication) {
        return HttpHelper.unauthorized()
      }
      return HttpHelper.ok(authentication)
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
