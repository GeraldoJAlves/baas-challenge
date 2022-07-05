const bcrypt = require('bcrypt')
const { MissingParamError } = require('../../presentation/errors')

module.exports = class BcryptAdapater {
  async compare (plaintext, digest) {
    if (!plaintext) throw new MissingParamError('plaintext')
    if (!digest) throw new MissingParamError('digest')
    await bcrypt.compare(plaintext, digest)
  }
}
