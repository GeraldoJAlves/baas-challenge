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

  async add ({ email, name, role, password } = {}) {
    if (!email) throw new MissingParamError('email')
    if (!name) throw new MissingParamError('name')
    if (!password) throw new MissingParamError('password')
    const exists = await this.checkAccountByEmailRepository.checkByEmail(email)
    if (exists) return false
    if (!role) role = 'user'
    const hashedPassword = await this.hasher.hash(password)
    return await this.addAccountRepository.add({ name, email, role, password: hashedPassword })
  }
}
