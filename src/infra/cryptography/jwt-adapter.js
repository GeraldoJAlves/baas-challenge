const jwt = require('jsonwebtoken')
const { InvalidParamError } = require('../../presentation/errors')

module.exports = class JwtAdapter {
  constructor (secret) {
    this.secret = secret
  }

  async encrypt (id) {
    if (!this.secret) throw new InvalidParamError('secret')
    if (!id) throw new InvalidParamError('id')
    await jwt.sign({ id }, this.secret)
  }
}
