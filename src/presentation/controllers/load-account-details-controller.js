module.exports = class LoadAccountDetailsController {
  constructor ({
    loadAccountDetailsUseCase
  }) {
    this.loadAccountDetailsUseCase = loadAccountDetailsUseCase
  }

  async handle ({ accountId } = {}) {
    await this.loadAccountDetailsUseCase.load(accountId)
  }
}
