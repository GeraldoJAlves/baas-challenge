const { MissingParamError } = require('../../presentation/errors')

module.exports = class AddAccountUseCase {
  constructor ({
    checkAccountByEmailRepository,
    hasher
  } = {}) {
    this.checkAccountByEmailRepository = checkAccountByEmailRepository
    this.hasher = hasher
  }

  async add ({ email, name, password } = {}) {
    if (!email) throw new MissingParamError('email')
    if (!name) throw new MissingParamError('name')
    if (!password) throw new MissingParamError('password')
    const exists = await this.checkAccountByEmailRepository.checkByEmail(email)
    if (exists) return false
    await this.hasher.hash(password)
  }
}
