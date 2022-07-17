module.exports = class SaveAccountDocumentController {
  constructor ({ uploadAccountDocumentUseCase } = {}) {
    this.uploadAccountDocumentUseCase = uploadAccountDocumentUseCase
  }

  async handle (request) {
    const { document } = request
    await this.uploadAccountDocumentUseCase.upload(document)
  }
}
