module.exports = class LoadAccountByTokenUseCase {
  constructor ({
    loadAccountByTokenRepository,
    decrypter
  }) {
    this.decrypter = decrypter
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken, role) {
    await this.decrypter.decrypt(accessToken)
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return account
  }
}
