const UploadAccountDocumentUseCase = require('../../../domain/usecases/upload-account-document-usecase')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')
const { AccountStorage } = require('../../../infra/storage/aws-s3')

module.exports = () => {
  const updateAccountDocumentRepository = new AccountMongoRepository()
  const uploadAccountDocumentStorage = new AccountStorage()
  return new UploadAccountDocumentUseCase({
    uploadAccountDocumentStorage,
    updateAccountDocumentRepository
  })
}
