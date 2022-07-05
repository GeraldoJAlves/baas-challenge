const bcrypt = require('bcrypt')

module.exports = class BcryptAdapater {
  async compare (plaintext, digest) {
    await bcrypt.compare(plaintext, digest)
  }
}
