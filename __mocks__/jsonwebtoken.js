module.exports = {
  signToken: 'any_token',
  async verify (token, secret) {
    this.token = token
    this.secret = secret
  },
  async sign (data, secret) {
    this.data = data
    this.secret = secret
    return this.signToken
  }
}
