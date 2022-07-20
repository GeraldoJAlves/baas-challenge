const { badRequest, serverError, unauthorized, notFound, forbidden, conflicted } = require('./components/')
const { apiKeyAuthSchema } = require('./schemas/')

module.exports = {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
  conflicted
}
