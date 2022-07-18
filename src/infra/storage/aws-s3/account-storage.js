const AWSS3Helper = require('./aws-s3-helper')

module.exports = class AccountStorage {
  async uploadDocument (document) {
    return await AWSS3Helper.upload(document)
  }
}
