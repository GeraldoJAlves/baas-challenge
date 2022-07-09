const { AuthUseCase } = require('../../../domain/usecases')
const { BcryptAdapater, JwtAdapter } = require('../../../infra/cryptography')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')
const { jwtSecret } = require('../../config/env')

module.exports = () => {
  const bcryptAdpater = new BcryptAdapater()
  const jwtAdapter = new JwtAdapter(jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new AuthUseCase({
    loadUserByEmailRepository: accountMongoRepository,
    encrypter: bcryptAdpater,
    hashComparer: jwtAdapter,
    updateAccessTokenRepository: accountMongoRepository
  })
}
