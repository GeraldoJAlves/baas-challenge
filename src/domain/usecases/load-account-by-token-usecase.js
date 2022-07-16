module.exports = class LoadAccountByTokenUseCase {
  constructor ({
    loadAccountByTokenRepository
  }) {
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken, role) {
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return account
  }
}
