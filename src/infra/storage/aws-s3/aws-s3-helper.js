const AWS = require('aws-sdk')
const { InvalidParamError } = require('../../../presentation/errors')

module.exports = {
  authorize: (credentials, endpoint) => {
    this.client = new AWS.S3({
      credentials,
      endpoint,
      s3ForcePathStyle: true
    })
  },
  clean: () => {
    this.client = null
  },
  getClient: () => {
    return this.client
  },
  upload: async (bucket, file) => {
    if (!this.client) throw new InvalidParamError('client')
    const { fileLocation } = await this.client.upload({
      Bucket: bucket,
      key: file.name,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'private'
    })
    return fileLocation
  }
}
