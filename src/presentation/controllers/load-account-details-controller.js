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
      const account = await this.loadAccountDetailsUseCase.load(accountId)
      if (!account) return HttpHelper.notFound()
      return HttpHelper.ok(account)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
