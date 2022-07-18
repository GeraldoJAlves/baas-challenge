const { MissingParamError } = require('../../presentation/errors')

module.exports = class UploadAccountDocumentUseCase {
  constructor ({
    uploadAccountDocumentStorage,
    updateAccountDocumentRepository
  }) {
    this.uploadAccountDocumentStorage = uploadAccountDocumentStorage
    this.updateAccountDocumentRepository = updateAccountDocumentRepository
  }

  async upload (document) {
    if (!document) throw new MissingParamError('document')
    const documentPath = await this.uploadAccountDocumentStorage.uploadDocument(document)
    await this.updateAccountDocumentRepository.updateDocumentPath(documentPath)
  }
}
