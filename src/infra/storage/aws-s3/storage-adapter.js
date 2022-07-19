const {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand
} = require('@aws-sdk/client-s3')
const { MissingParamError, InvalidParamError } = require('../../../presentation/errors')

module.exports = class StorageAdapter {
  constructor ({
    credentials,
    endpoint,
    bucket,
    region
  } = {}) {
    this.client = new S3Client({
      credentials,
      endpoint,
      region,
      forcePathStyle: true
    })
    this.bucket = bucket
  }

  async createBucket () {
    await this.client.send(new CreateBucketCommand({
      Bucket: this.bucket
    }))
  }

  async upload ({ file, key }) {
    if (!file) throw new MissingParamError('file')
    if (!key) throw new MissingParamError('key')
    if (!file.data || !file.name || !file.mimetype) throw new InvalidParamError('file')
    await this.createBucket()
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'private'
    }))
    return { bucket: this.bucket, key }
  }
}
