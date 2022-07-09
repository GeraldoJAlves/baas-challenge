module.exports = {
  isValid: true,
  hashedText: 'hashed_text',
  hash (plaintext, salt) {
    this.plaintext = plaintext
    this.salt = salt
    return this.hashedText
  },
  compare (plaintext, digest) {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}
