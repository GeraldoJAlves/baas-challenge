module.exports = class InvalidUploadFileError extends Error {
  constructor (paramName) {
    super(`Invalid upload file: ${paramName}`)
    this.name = 'InvalidUploadFileError'
  }
}
