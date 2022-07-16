const { AccessDeniedError } = require('../errors')
const HttpHelper = require('../helpers/http-helper')

module.exports = class AuthMiddleware {
  constructor ({ loadAccountByToken, role }) {
    this.loadAccountByToken = loadAccountByToken
    this.role = role
  }

  async handle ({ accessToken } = {}) {
    try {
      if (!accessToken) return HttpHelper.forbidden(new AccessDeniedError())
      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (!account) return HttpHelper.forbidden(new AccessDeniedError())
      return HttpHelper.ok({ accountId: account.id })
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
