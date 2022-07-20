const accountDetailsSchema = require('./account-details-schema')
const accountSchema = require('./account-schema')
const apiKeyAuthSchema = require('./api-key-auth-schema')
const errorSchema = require('./error-schema')
const loginParamsSchema = require('./login-params-schema')
const signupParamsSchema = require('./signup-params-schema')
const accountDetailsParamsSchema = require('./account-details-params-schema')
const accountDocumentParamsSchema = require('./account-document-params-schema')

module.exports = {
  accountSchema,
  apiKeyAuthSchema,
  loginParamsSchema,
  signupParamsSchema,
  errorSchema,
  accountDetailsSchema,
  accountDetailsParamsSchema,
  accountDocumentParamsSchema
}
