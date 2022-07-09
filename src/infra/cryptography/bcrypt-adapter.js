const bcrypt = require('bcrypt')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class BcryptAdapater {
  constructor (salt) {
    this.salt = salt
  }

  async hash (plaintext) {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaintext, digest) {
    if (!plaintext) throw new MissingParamError('plaintext')
    if (!digest) throw new MissingParamError('digest')
    return await bcrypt.compare(plaintext, digest)
  }
}
