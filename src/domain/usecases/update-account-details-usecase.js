const { MissingParamError } = require('../../presentation/errors')

module.exports = class UpdateAccountDetailsUseCase {
  constructor ({ updateAccountDetailsRepository }) {
    this.updateAccountDetailsRepository = updateAccountDetailsRepository
  }

  async update (accountId, { fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep } = {}) {
    if (!accountId) throw new MissingParamError('accountId')
    await this.updateAccountDetailsRepository
      .updateDetails(accountId, { fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep })
  }
}
