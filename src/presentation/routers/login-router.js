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
