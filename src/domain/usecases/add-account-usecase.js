const { MissingParamError } = require('../../presentation/errors')

module.exports = class AddAccountUseCase {
  constructor ({
    checkAccountByEmailRepository,
    addAccountRepository,
    hasher
  } = {}) {
    this.checkAccountByEmailRepository = checkAccountByEmailRepository
    this.addAccountRepository = addAccountRepository
    this.hasher = hasher
  }

  async add ({ email, name, password } = {}) {
    if (!email) throw new MissingParamError('email')
    if (!name) throw new MissingParamError('name')
    if (!password) throw new MissingParamError('password')
    const exists = await this.checkAccountByEmailRepository.checkByEmail(email)
    if (exists) return false
    const hashedPassword = await this.hasher.hash(password)
    return await this.addAccountRepository.add({ name, email, password: hashedPassword })
  }
}
