const express = require('express')
const middlewares = require('./middlewares')
const routes = require('./routes')
const setup = require('./setup')

module.exports = async () => {
  const app = express()
  setup(app)
  middlewares(app)
  routes(app)
  return app
}
