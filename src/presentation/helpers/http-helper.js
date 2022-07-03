module.exports = class HttpHelper {
  static badRequest (error) {
    return {
      body: error,
      statusCode: 400
    }
  }
}
