module.exports = class EmailInUseError extends Error {
  constructor () {
    super('The received email si already in use')
    this.name = 'EmailInUseError'
  }
}
