module.exports = class LoadAccountDetailsUseCase {
  constructor ({ loadAccountDetailsRepository }) {
    this.loadAccountDetailsRepository = loadAccountDetailsRepository
  }

  async load (accountId) {
    return await this.loadAccountDetailsRepository.loadDetails(accountId)
  }
}
