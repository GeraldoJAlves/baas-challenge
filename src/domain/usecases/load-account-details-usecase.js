const { MissingParamError } = require('../../presentation/errors')

module.exports = class LoadAccountDetailsUseCase {
  constructor ({ loadAccountDetailsRepository }) {
    this.loadAccountDetailsRepository = loadAccountDetailsRepository
  }

  async load (accountId) {
    if (!accountId) throw new MissingParamError('accountId')
    return await this.loadAccountDetailsRepository.loadDetails(accountId)
  }
}
