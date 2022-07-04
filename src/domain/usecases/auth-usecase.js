const { MissingParamError, InvalidParamError } = require('../../presentation/errors')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, encrypter, tokenGenerator } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!this.loadUserByEmailRepository) throw new MissingParamError('LoadUserByEmailRepository')
    if (!this.encrypter) throw new MissingParamError('Encrypter')
    if (!this.tokenGenerator) throw new MissingParamError('TokenGenerator')
    if (!this.loadUserByEmailRepository.load) throw new InvalidParamError('LoadUserByEmailRepository')
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
    const user = await this.loadUserByEmailRepository.load(email)
    if (!user || !this.encrypter.compare(password, user.password)) return null
    return await this.tokenGenerator.generate(user.id)
  }
}
