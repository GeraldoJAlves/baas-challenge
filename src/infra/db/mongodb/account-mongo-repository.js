const MongoHelper = require('./mongo-helper')

module.exports = class AccountMongoRepository {
  async loadByEmail (email) {
    return await MongoHelper.getCollection('accounts').findOne({ email })
  }
}
