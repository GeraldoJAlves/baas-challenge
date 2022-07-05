const jwt = require('jsonwebtoken')

module.exports = class JwtAdapter {
  constructor (secret) {
    this.secret = secret
  }

  async encrypt (id) {
    await jwt.sign({ id }, this.secret)
  }
}
