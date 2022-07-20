const { accountSchema } = require('./schemas/')
const errorSchema = require('./schemas/error-schema')
const loginParamsSchema = require('./schemas/login-params-schema')
const signupParamsSchema = require('./schemas/signup-params-schema')

module.exports = {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signupParamsSchema,
  error: errorSchema
}
