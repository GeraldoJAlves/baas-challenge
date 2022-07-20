module.exports = {
  cpf: {
    validNumber: true,
    isValid: function (value) {
      this.value = value
      return this.validNumber
    }
  }
}
