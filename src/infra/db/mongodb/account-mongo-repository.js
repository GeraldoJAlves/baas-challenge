const MongoHelper = require('./mongo-helper')
const { MissingParamError, InvalidParamError } = require('../../../presentation/errors')

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
    const roles = {
      admin: ['admin', 'userAccount', 'user'],
      userAccount: ['userAccount', 'user'],
      user: ['user']
    }
    if (!accessToken) throw new MissingParamError('accessToken')
    if (!roles[role]) throw new InvalidParamError('role')
    const filter = roles[role].map((role) => ({ role }))
    const account = await MongoHelper.getCollection('accounts').findOne({ accessToken, $or: filter }, { projection: { _id: 1 } })
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

  async updateDocumentPath (id, documentPath) {
    if (!id) throw new MissingParamError('id')
    if (!documentPath) throw new MissingParamError('documentPath')
    await MongoHelper.getCollection('accounts').updateOne({ _id: id }, { $set: { documentPath } })
  }

  async loadDetails (id) {
    if (!id) throw new MissingParamError('id')
    const account = await MongoHelper.getCollection('accounts').findOne({
      _id: id
    }, {
      projection: {
        _id: 0,
        email: 1,
        details: 1
      }
    })
    if (!account || !account.details) return null
    return { email: account.email, ...account.details }
  }
}
