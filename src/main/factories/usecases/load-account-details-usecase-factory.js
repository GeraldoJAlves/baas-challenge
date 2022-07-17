const { LoadAccountDetailsUseCase } = require('../../../domain/usecases')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')

module.exports = () => {
  const loadAccountDetailsRepository = new AccountMongoRepository()
  return new LoadAccountDetailsUseCase({
    loadAccountDetailsRepository
  })
}
