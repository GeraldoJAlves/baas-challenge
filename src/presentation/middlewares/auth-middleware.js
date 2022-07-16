const { AccessDeniedError } = require('../errors')
const HttpHelper = require('../helpers/http-helper')

module.exports = class AuthMiddleware {
  constructor ({ loadAccountByToken, role }) {
    this.loadAccountByToken = loadAccountByToken
    this.role = role
  }

  async handle ({ accessToken } = {}) {
    if (!accessToken) return HttpHelper.forbidden(new AccessDeniedError())
    await this.loadAccountByToken.load(accessToken, this.role)
  }
}
