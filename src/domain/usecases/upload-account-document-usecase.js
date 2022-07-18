module.exports = class UploadAccountDocumentUseCase {
  constructor ({
    uploadAccountDocumentStorage
  }) {
    this.uploadAccountDocumentStorage = uploadAccountDocumentStorage
  }

  async upload (document) {
    await this.uploadAccountDocumentStorage.upload(document)
  }
}
