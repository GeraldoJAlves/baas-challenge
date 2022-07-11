const { HttpHelper } = require('../helpers')

module.exports = class AccountDetailsController {
  constructor ({ validation, updateAccountDetailsUseCase }) {
    this.validation = validation
    this.updateAccountDetailsUseCase = updateAccountDetailsUseCase
  }

  async handle (httpRequest) {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return HttpHelper.badRequest(error)
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
    } catch (error) {
      console.error(error)
      return HttpHelper.serverError(error)
    }
  }
}
