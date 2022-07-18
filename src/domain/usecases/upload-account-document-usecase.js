module.exports = class UploadAccountDocumentUseCase {
  constructor ({
    uploadAccountDocumentStorage,
    updateAccountDocumentRepository
  }) {
    this.uploadAccountDocumentStorage = uploadAccountDocumentStorage
    this.updateAccountDocumentRepository = updateAccountDocumentRepository
  }

  async upload (document) {
    const documentPath = await this.uploadAccountDocumentStorage.upload(document)
    await this.updateAccountDocumentRepository.updateDocumentPath(documentPath)
  }
}
