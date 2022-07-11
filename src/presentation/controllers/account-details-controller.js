module.exports = class AccountDetailsController {
  constructor ({ validation }) {
    this.validation = validation
  }

  async handle (httpRequest) {
    this.validation.validate(httpRequest.body)
  }
}
