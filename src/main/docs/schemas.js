const {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema,
  accountDetailsParamsSchema,
  accountDetailsSchema,
  accountDocumentParamsSchema
} = require('./schemas/')

module.exports = {
  account: accountSchema,
  accountDetails: accountDetailsSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  accountDetailsParams: accountDetailsParamsSchema,
  accountDocumentParams: accountDocumentParamsSchema,
  error: errorSchema
}
