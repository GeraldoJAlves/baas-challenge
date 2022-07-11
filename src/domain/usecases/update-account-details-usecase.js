module.exports = class UpdateAccountDetailsUseCase {
  constructor ({ updateAccountDetailsRepository }) {
    this.updateAccountDetailsRepository = updateAccountDetailsRepository
  }

  async update (accountId, { fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep }) {
    await this.updateAccountDetailsRepository
      .updateAccountDetails(accountId, { fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep })
  }
}
