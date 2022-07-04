const { MissingParamError } = require('../../presentation/errors')

module.exports = class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
  }
}
