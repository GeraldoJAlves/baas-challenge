const { HttpHelper } = require('../helpers')

module.exports = class SaveAccountDocumentController {
  constructor ({ uploadAccountDocumentUseCase, validation } = {}) {
    this.uploadAccountDocumentUseCase = uploadAccountDocumentUseCase
    this.validation = validation
  }

  async handle (request) {
    try {
      const error = this.validation.validate(request)
      if (error) return HttpHelper.badRequest(error)
      const { document, accountId } = request
      await this.uploadAccountDocumentUseCase.upload(accountId, document)
      return HttpHelper.noContent()
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
