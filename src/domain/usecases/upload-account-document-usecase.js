const { MissingParamError } = require('../../presentation/errors')

module.exports = class UploadAccountDocumentUseCase {
  constructor ({
    uploadAccountDocumentStorage,
    updateAccountDocumentRepository
  }) {
    this.uploadAccountDocumentStorage = uploadAccountDocumentStorage
    this.updateAccountDocumentRepository = updateAccountDocumentRepository
  }

  async upload ({ accountId, document } = {}) {
    if (!accountId) throw new MissingParamError('accountId')
    if (!document) throw new MissingParamError('document')
    const fileKey = `${accountId}.pdf`
    const documentPath = await this.uploadAccountDocumentStorage.uploadDocument({ fileKey, document })
    await this.updateAccountDocumentRepository.updateDocumentPath({ id: accountId, documentPath })
  }
}
