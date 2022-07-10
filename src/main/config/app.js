const express = require('express')
const middlewares = require('./middlewares')
const routes = require('./routes')
const setup = require('./setup')
const swagger = require('./swagger')

module.exports = async () => {
  const app = express()
  swagger(app)
  setup(app)
  middlewares(app)
  routes(app)
  return app
}
