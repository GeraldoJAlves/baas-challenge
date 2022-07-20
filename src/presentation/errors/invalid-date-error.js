module.exports = class InvalidDateError extends Error {
  constructor (paramName) {
    super(`Invalid Date in param ${paramName}`)
    this.name = 'InvalidDateError'
  }
}
