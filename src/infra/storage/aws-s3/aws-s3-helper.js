const AWS = require('aws-sdk')
const { InvalidParamError } = require('../../../presentation/errors')

module.exports = {
  authorize: (credentials, endpoint, bucket) => {
    this.client = new AWS.S3({
      credentials,
      endpoint,
      s3ForcePathStyle: true
    })
    this.bucket = bucket
  },
  clean: () => {
    this.client = null
    this.bucket = null
  },
  getClient: () => {
    return this.client
  },
  upload: async (file) => {
    if (!this.client) throw new InvalidParamError('client')
    const { fileLocation } = await this.client.upload({
      Bucket: this.bucket,
      key: file.name,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'private'
    })
    return fileLocation
  }
}
