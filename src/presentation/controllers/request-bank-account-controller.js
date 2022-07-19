module.exports = class RequestBankAccountController {
  constructor ({
    requestBankAccountUseCase
  } = {}) {
    this.requestBankAccountUseCase = requestBankAccountUseCase
  }

  async handle ({ accountId } = {}) {
    await this.requestBankAccountUseCase.request(accountId)
  }
}
