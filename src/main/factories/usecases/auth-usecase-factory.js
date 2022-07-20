const { AuthUseCase } = require('../../../domain/usecases')
const { BcryptAdapater, JwtAdapter } = require('../../../infra/cryptography')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')
const { jwtSecret, salt } = require('../../config/env')

module.exports = () => {
  const bcryptAdpater = new BcryptAdapater(salt)
  const jwtAdapter = new JwtAdapter(jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new AuthUseCase({
    loadAccountByEmailRepository: accountMongoRepository,
    encrypter: jwtAdapter,
    hashComparer: bcryptAdpater,
    updateAccessTokenRepository: accountMongoRepository
  })
}
