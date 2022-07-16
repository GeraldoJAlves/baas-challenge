const { LoadAccountByTokenUseCase } = require('../../../domain/usecases')
const { JwtAdapter } = require('../../../infra/cryptography')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')
const { jwtSecret } = require('../../config/env')

module.exports = () => {
  const decrypter = new JwtAdapter(jwtSecret)
  const loadAccountByTokenRepository = new AccountMongoRepository()
  return new LoadAccountByTokenUseCase({
    decrypter,
    loadAccountByTokenRepository
  })
}
