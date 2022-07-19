const { HttpHelper } = require('../helpers')

module.exports = class RequestBankAccountController {
  constructor ({
    requestBankAccountUseCase
  } = {}) {
    this.requestBankAccountUseCase = requestBankAccountUseCase
  }

  async handle ({ accountId } = {}) {
    try {
      await this.requestBankAccountUseCase.request(accountId)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
