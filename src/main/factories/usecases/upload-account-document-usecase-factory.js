const UploadAccountDocumentUseCase = require('../../../domain/usecases/upload-account-document-usecase')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')
const { AccountStorage, StorageAdapter } = require('../../../infra/storage/aws-s3')
const { AWSConfigs } = require('../../config/env')

module.exports = () => {
  const storage = new StorageAdapter({
    credentials: AWSConfigs.credentials,
    endpoint: AWSConfigs.endpoint,
    bucket: AWSConfigs.bucketName,
    region: AWSConfigs.region
  })

  const updateAccountDocumentRepository = new AccountMongoRepository()
  const uploadAccountDocumentStorage = new AccountStorage({ storage })
  return new UploadAccountDocumentUseCase({
    uploadAccountDocumentStorage,
    updateAccountDocumentRepository
  })
}
