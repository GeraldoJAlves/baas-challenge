module.exports = class UploadAccountDocumentUseCase {
  constructor ({
    uploadAccountDocumentStorage
  }) {
    this.uploadAccountDocumentStorage = uploadAccountDocumentStorage
  }

  async upload (document) {
    this.uploadAccountDocumentStorage.upload(document)
  }
}
