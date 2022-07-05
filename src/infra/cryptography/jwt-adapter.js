const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class JwtAdapter {
  constructor (secret) {
    this.secret = secret
  }

  async encrypt (id) {
    if (!this.secret) throw new MissingParamError('secret')
    if (!id) throw new MissingParamError('id')
    return await jwt.sign({ id }, this.secret)
  }
}
