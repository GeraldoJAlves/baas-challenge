module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super(`Invalid param: ${paramName}`)
    this.message = 'InvalidParamError'
  }
}
