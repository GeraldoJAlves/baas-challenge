module.exports = class SignupController {
  constructor ({ addAccountUseCase }) {
    this.addAccountUseCase = addAccountUseCase
  }

  async handle (httpRequest) {
    const { name, email, password } = httpRequest.body
    await this.addAccountUseCase.add({ name, email, password })
  }
}
