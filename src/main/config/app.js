const express = require('express')
const middlewares = require('./middlewares')
const setup = require('./setup')

module.exports = async () => {
  const app = express()
  setup(app)
  middlewares(app)
  return app
}
