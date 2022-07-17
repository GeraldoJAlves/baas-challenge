const { HttpHelper } = require('../helpers')

module.exports = class SaveAccountDetailsController {
  constructor ({ validation, updateAccountDetailsUseCase }) {
    this.validation = validation
    this.updateAccountDetailsUseCase = updateAccountDetailsUseCase
  }

  async handle (request) {
    try {
      const { accountId, ...data } = request
      const error = this.validation.validate(data)
      if (error) return HttpHelper.badRequest(error)
      await this.updateAccountDetailsUseCase.update(accountId, data)
      return HttpHelper.ok(data)
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
