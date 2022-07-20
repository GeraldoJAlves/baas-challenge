const { loginPath, signupPath, accountDetailsPath, accountDocumentPath } = require('./paths/')

module.exports = {
  '/login': loginPath,
  '/signup': signupPath,
  '/account/details': accountDetailsPath,
  '/account/document': accountDocumentPath
}
