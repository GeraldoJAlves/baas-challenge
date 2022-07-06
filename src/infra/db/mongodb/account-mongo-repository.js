const MongoHelper = require('./mongo-helper')
const { MissingParamError } = require('../../../presentation/errors')

module.exports = class AccountMongoRepository {
  async loadByEmail (email) {
    if (!email) throw new MissingParamError('email')
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

  async updateAccessToken (id, token) {
    if (!id) throw new MissingParamError('id')
    if (!token) throw new MissingParamError('token')
  }
}
