module.exports = class LoadAccountDetailsUseCase {
  constructor ({ loadAccountDetailsRepository }) {
    this.loadAccountDetailsRepository = loadAccountDetailsRepository
  }

  async load (accountId) {
    await this.loadAccountDetailsRepository.loadDetails(accountId)
  }
}
