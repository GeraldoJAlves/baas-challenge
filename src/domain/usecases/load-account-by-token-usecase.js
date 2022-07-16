module.exports = class LoadAccountByTokenUseCase {
  constructor ({
    loadAccountByTokenRepository,
    decrypter
  }) {
    this.decrypter = decrypter
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken, role) {
    const data = await this.decrypter.decrypt(accessToken)
    if (!data) return null
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return account
  }
}
