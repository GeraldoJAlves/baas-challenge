const { HttpHelper } = require('../helpers')

module.exports = class SaveAccountDocumentController {
  constructor ({ uploadAccountDocumentUseCase } = {}) {
    this.uploadAccountDocumentUseCase = uploadAccountDocumentUseCase
  }

  async handle (request) {
    try {
      const { document } = request
      await this.uploadAccountDocumentUseCase.upload(document)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
