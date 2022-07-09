const { MissingParamError } = require('../../presentation/errors')

module.exports = class AddAccountUseCase {
  constructor ({ checkAccountByEmailRepository } = {}) {
    this.checkAccountByEmailRepository = checkAccountByEmailRepository
  }

  async add ({ email, name, password } = {}) {
    if (!email) throw new MissingParamError('email')
    if (!name) throw new MissingParamError('name')
    if (!password) throw new MissingParamError('password')
    await this.checkAccountByEmailRepository.check(email)
  }
}
