const { AccountAlreadyRequestedError } = require('../errors')
const { HttpHelper } = require('../helpers')

module.exports = class RequestBankAccountController {
  constructor ({
    requestBankAccountUseCase
  } = {}) {
    this.requestBankAccountUseCase = requestBankAccountUseCase
  }

  async handle ({ accountId } = {}) {
    try {
      const alreadyRequested = await this.requestBankAccountUseCase.request(accountId)
      if (alreadyRequested) return HttpHelper.conflict(new AccountAlreadyRequestedError())
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
