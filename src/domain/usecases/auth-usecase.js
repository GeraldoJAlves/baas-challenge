const { MissingParamError } = require('../../presentation/errors')

module.exports = class AuthUseCase {
  constructor ({
    loadAccountByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  } = {}) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.encrypter = encrypter
    this.hashComparer = hashComparer
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (email, password) {
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
    const user = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!user) return null
    const isValid = await this.hashComparer.compare(password, user.password)
    if (!isValid) return null
    const accessToken = await this.encrypter.encrypt(user.id)
    await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
    return { accessToken, name: user.name }
  }
}
