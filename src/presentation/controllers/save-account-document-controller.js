const { HttpHelper } = require('../helpers')

module.exports = class SaveAccountDocumentController {
  constructor ({ uploadAccountDocumentUseCase, validation } = {}) {
    this.uploadAccountDocumentUseCase = uploadAccountDocumentUseCase
    this.validation = validation
  }

  async handle (request) {
    try {
      this.validation.validate(request)
      const { document } = request
      await this.uploadAccountDocumentUseCase.upload(document)
      return HttpHelper.noContent()
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
