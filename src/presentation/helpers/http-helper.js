const { ServerError, UnauthorizedError } = require('../errors')

module.exports = class HttpHelper {
  static badRequest (error) {
    return {
      body: error,
      statusCode: 400
    }
  }

  static serverError (error) {
    return {
      body: new ServerError(error.stack),
      statusCode: 500
    }
  }

  static unauthorized () {
    return {
      body: new UnauthorizedError(),
      statusCode: 401
    }
  }
}
