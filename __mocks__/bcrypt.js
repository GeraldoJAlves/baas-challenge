module.exports = {
  isValid: true,
  async compare (plaintext, digest) {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}
