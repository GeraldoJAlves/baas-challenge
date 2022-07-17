const { HttpHelper } = require('../helpers')

module.exports = class LoadAccountDetailsController {
  constructor ({
    loadAccountDetailsUseCase
  }) {
    this.loadAccountDetailsUseCase = loadAccountDetailsUseCase
  }

  async handle (request) {
    try {
      const { accountId } = request
      await this.loadAccountDetailsUseCase.load(accountId)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
