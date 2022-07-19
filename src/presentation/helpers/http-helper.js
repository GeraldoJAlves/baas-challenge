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
      body: new ServerError(error?.stack),
      statusCode: 500
    }
  }

  static forbidden (error) {
    return {
      body: error,
      statusCode: 403
    }
  }

  static unauthorized () {
    return {
      body: new UnauthorizedError(),
      statusCode: 401
    }
  }

  static ok (body) {
    return {
      body,
      statusCode: 200
    }
  }

  static created (body) {
    return {
      body,
      statusCode: 201
    }
  }

  static conflict (error) {
    return {
      body: error,
      statusCode: 409
    }
  }

  static noContent (body) {
    return {
      statusCode: 204
    }
  }

  static notFound () {
    return {
      statusCode: 404
    }
  }
}
