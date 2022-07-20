const badRequest = require('./bad-request')
const conflicted = require('./conflicted')
const forbidden = require('./forbidden')
const notFound = require('./not-found')
const serverError = require('./server-error')
const unauthorized = require('./unauthorized')

module.exports = {
  forbidden,
  badRequest,
  notFound,
  serverError,
  unauthorized,
  conflicted
}
