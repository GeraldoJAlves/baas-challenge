const InvalidParamError = require('./invalid-param-error')
const ServerError = require('./server-error')
const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unauthorized-error')
const AccessDeniedError = require('./access-denied-error')
const InvalidUploadFileError = require('./invalid-upload-file-error')

module.exports = {
  InvalidParamError,
  ServerError,
  MissingParamError,
  UnauthorizedError,
  AccessDeniedError,
  InvalidUploadFileError
}
