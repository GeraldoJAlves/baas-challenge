module.exports = class LoadAccountByTokenUseCase {
  constructor ({
    loadAccountByTokenRepository
  }) {
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken, role) {
    await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
  }
}
