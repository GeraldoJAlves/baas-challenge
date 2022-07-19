module.exports = class InvalidFileTypeError extends Error {
  constructor (paramName, fileType) {
    super(`Invalid file type, expected type "${fileType}" in param ${paramName}`)
    this.name = 'InvalidUploadFileError'
  }
}
