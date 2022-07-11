module.exports = class AccountDetailsController {
  constructor ({ validation, updateAccountDetailsUseCase }) {
    this.validation = validation
    this.updateAccountDetailsUseCase = updateAccountDetailsUseCase
  }

  async handle (httpRequest) {
    this.validation.validate(httpRequest.body)
    const {
      fullName,
      birthDate,
      fatherName,
      motherName,
      rg,
      cpf,
      address,
      city,
      state,
      cep
    } = httpRequest.body
    this.updateAccountDetailsUseCase.updateAccountDetails({
      fullName,
      birthDate,
      fatherName,
      motherName,
      rg,
      cpf,
      address,
      city,
      state,
      cep
    })
  }
}
