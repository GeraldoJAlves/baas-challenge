module.exports = class LoadAccountByTokenUseCase {
  constructor ({
    loadAccountByTokenRepository,
    decrypter
  }) {
    this.decrypter = decrypter
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken, role) {
    try {
      const data = await this.decrypter.decrypt(accessToken)
      if (!data) return null
    } catch (error) {
      return null
    }
    return await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
  }
}
