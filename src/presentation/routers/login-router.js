const { MissingParamError } = require('../errors')
const { HttpHelper } = require('../helpers')

module.exports = class LoginRouter {
  async handle (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) return HttpHelper.badRequest(new MissingParamError('email'))
      if (!password) return HttpHelper.badRequest(new MissingParamError('password'))
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
