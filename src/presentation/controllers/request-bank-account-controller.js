const { AccountAlreadyRequestedError } = require('../errors')
const { HttpHelper } = require('../helpers')

module.exports = class RequestBankAccountController {
  constructor ({
    checkAccountDetailsUseCase,
    requestBankAccountUseCase
  } = {}) {
    this.checkAccountDetailsUseCase = checkAccountDetailsUseCase
    this.requestBankAccountUseCase = requestBankAccountUseCase
  }

  async handle ({ accountId } = {}) {
    try {
      const requestedId = await this.requestBankAccountUseCase.request(accountId)
      if (!requestedId) return HttpHelper.conflict(new AccountAlreadyRequestedError())
      return HttpHelper.created({ requestedId })
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
