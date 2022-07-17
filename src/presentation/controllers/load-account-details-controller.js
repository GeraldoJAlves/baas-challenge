const { HttpHelper } = require('../helpers')

module.exports = class LoadAccountDetailsController {
  constructor ({
    loadAccountDetailsUseCase,
    validation
  }) {
    this.loadAccountDetailsUseCase = loadAccountDetailsUseCase
    this.validation = validation
  }

  async handle (request) {
    try {
      const error = this.validation.validate(request)
      if (error) return HttpHelper.badRequest(error)
      const { accountId } = request
      const account = await this.loadAccountDetailsUseCase.load(accountId)
      if (!account) return HttpHelper.notFound()
      return HttpHelper.ok(account)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
