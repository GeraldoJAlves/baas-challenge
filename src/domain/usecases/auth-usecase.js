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
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) return null
    const isValid = await this.hashComparer.compare(password, account.password)
    if (!isValid) return null
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return { accessToken, name: account.name }
  }
}
