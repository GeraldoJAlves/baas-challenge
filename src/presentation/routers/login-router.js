const { HttpHelper } = require('../helpers')

module.exports = class LoginRouter {
  constructor ({ authUseCase, validation } = {}) {
    this.authUseCase = authUseCase
    this.validation = validation
  }

  async handle (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return HttpHelper.badRequest(error)
      }
      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpHelper.unauthorized()
      }
      return HttpHelper.ok({ accessToken })
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
