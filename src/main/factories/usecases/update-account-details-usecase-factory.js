const { UpdateAccountDetailsUseCase } = require('../../../domain/usecases')
const { AccountMongoRepository } = require('../../../infra/db/mongodb')

module.exports = () => {
  const updateAccountDetailsRepository = new AccountMongoRepository()
  return new UpdateAccountDetailsUseCase({ updateAccountDetailsRepository })
}
