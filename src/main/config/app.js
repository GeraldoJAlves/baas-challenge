const express = require('express')
const setup = require('./setup')

module.exports = async () => {
  const app = express()
  setup(app)
  return app
}
