const { MissingParamError } = require('../errors')
const { HttpHelper } = require('../helpers')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async handle (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) return HttpHelper.badRequest(new MissingParamError('email'))
      if (!password) return HttpHelper.badRequest(new MissingParamError('password'))
      this.authUseCase.auth(email, password)
      return HttpHelper.unauthorized()
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
