const { InvalidParamError } = require('../errors')
const { HttpHelper } = require('../helpers')

module.exports = class LoginRouter {
  async handle (httpRequest) {
    const { email, password } = httpRequest.body
    if (!email) return HttpHelper.badRequest(new InvalidParamError('email'))
    if (!password) return HttpHelper.badRequest(new InvalidParamError('password'))
  }
}
