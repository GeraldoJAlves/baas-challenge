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

  async checkByEmail (email) {
    if (!email) throw new MissingParamError('email')
    const account = await MongoHelper
      .getCollection('accounts')
      .findOne({
        email
      }, {
        projection: {
          _id: 1
        }
      })
    return account !== null
  }

  async add ({ name, email, password } = {}) {
    if (!name) throw new MissingParamError('name')
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
    const result = await MongoHelper.getCollection('accounts').insertOne({ name, email, password })
    return result.insertedId !== null
  }

  async loadByToken (accessToken, role = 'user') {
    const account = await MongoHelper.getCollection('accounts').findOne({ accessToken, role }, { projection: { _id: 1 } })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id, token) {
    if (!id) throw new MissingParamError('id')
    if (!token) throw new MissingParamError('token')
    await MongoHelper.getCollection('accounts').updateOne({ _id: id }, { $set: { accessToken: token } })
  }

  async updateDetails (id, { fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep } = {}) {
    if (!id) throw new MissingParamError('id')
    await MongoHelper.getCollection('accounts').updateOne({ _id: id }, { $set: { details: { fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep } } })
  }
}
