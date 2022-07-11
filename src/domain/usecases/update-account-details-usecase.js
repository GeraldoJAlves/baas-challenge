module.exports = class UpdateAccountDetailsUseCase {
  constructor ({ updateAccountDetailsRepository }) {
    this.updateAccountDetailsRepository = updateAccountDetailsRepository
  }

  async update ({ fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep }) {
    await this.updateAccountDetailsRepository
      .updateAccountDetails({ fullName, birthDate, fatherName, motherName, rg, cpf, address, city, state, cep })
  }
}
