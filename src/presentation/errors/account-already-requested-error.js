module.exports = class AccountAlreadyRequestedError extends Error {
  constructor () {
    super('The account already requested an bank account')
    this.name = 'AccountAlreadyRequestedError'
  }
}
