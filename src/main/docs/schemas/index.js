const accountSchema = require('./account-schema')
const apiKeyAuthSchema = require('./api-key-auth-schema')
const errorSchema = require('./error-schema')
const loginParamsSchema = require('./login-params-schema')
const signupParamsSchema = require('./signup-params-schema')

module.exports = {
  accountSchema,
  apiKeyAuthSchema,
  loginParamsSchema,
  signupParamsSchema,
  errorSchema
}
