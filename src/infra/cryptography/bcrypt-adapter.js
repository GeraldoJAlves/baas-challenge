const bcrypt = require('bcrypt')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class BcryptAdapater {
  constructor (salt) {
    this.salt = salt
  }

  async hash (plaintext) {
    if (!this.salt) throw new MissingParamError('salt')
    if (!plaintext) throw new MissingParamError('plaintext')
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaintext, digest) {
    if (!plaintext) throw new MissingParamError('plaintext')
    if (!digest) throw new MissingParamError('digest')
    return bcrypt.compare(plaintext, digest)
  }
}
