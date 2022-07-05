const MongoHelper = require('./mongo-helper')

module.exports = class AccountMongoRepository {
  async loadByEmail (email) {
    const account = await MongoHelper
      .getCollection('accounts')
      .findOne({
        email
      }, {
        projection: {
          _id: 1,
          name: 1,
          password: 1
        }
      })
    if (!account) return null
    return MongoHelper.map(account)
  }
}
