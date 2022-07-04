const { MissingParamError, InvalidParamError } = require('../../presentation/errors')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, encrypter } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
  }

  async auth (email, password) {
    if (!this.loadUserByEmailRepository) throw new MissingParamError('LoadUserByEmailRepository')
    if (!this.encrypter) throw new MissingParamError('Encrypter')
    if (!this.loadUserByEmailRepository.load) throw new InvalidParamError('LoadUserByEmailRepository')
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) return null
    this.encrypter.compare(password, user.password)
  }
}
