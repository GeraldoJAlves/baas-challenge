module.exports = {
  token: 'any_token',
  async sign (data, secret) {
    this.data = data
    this.secret = secret
    return this.token
  }
}
