module.exports = class LoginRouter {
  async handle (httpRequest) {
    const { email } = httpRequest.body
    if (!email) {
      return {
        statusCode: 400
      }
    }
  }
}
