const { mockClient } = require('aws-sdk-client-mock')
const { mockLibStorageUpload } = require('aws-sdk-client-mock/libStorage')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { StorageAdapter } = require('../../../../src/infra/storage/aws-s3')
const s3Mock = mockClient(S3Client)
mockLibStorageUpload(s3Mock)

const makeSut = () => {
  const sut = new StorageAdapter({
    bucket: 'any_bucket'
  })
  return { sut }
}

const makeFile = () => ({ name: 'any_filename', mimetype: 'text/plain', data: 'any_data_document' })

describe('Storage Adapter', () => {
  test('Should call AWS S3 with correct values', async () => {
    const { sut } = makeSut()
    const response = await sut.upload({
      file: makeFile,
      key: 'any_file.txt'
    })
    expect(response).toEqual({
      bucket: 'any_bucket',
      key: 'any_file.txt'
    })
    expect(s3Mock).toHaveReceivedCommandTimes(PutObjectCommand, 1)
  })
})
