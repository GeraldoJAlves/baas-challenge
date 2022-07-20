module.exports = class InvalidCpfError extends Error {
  constructor (paramName) {
    super(`Invalid CPF in param ${paramName}`)
    this.name = 'InvalidCpfError'
  }
}
