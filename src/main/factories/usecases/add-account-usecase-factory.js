const { AddAccountUseCase } = require('../../../domain/usecases')
const BcryptAdapater = require('../../../infra/cryptography/bcrypt-adapter')
const AccountMongoRepository = require('../../../infra/db/mongodb/account-mongo-repository')
const { salt } = require('../../config/env')

module.exports = () => {
  const bcrypterAdapter = new BcryptAdapater(salt)
  const accountRepository = new AccountMongoRepository()

  return new AddAccountUseCase({
    checkAccountByEmailRepository: accountRepository,
    addAccountRepository: accountRepository,
    hasher: bcrypterAdapter
  })
}
