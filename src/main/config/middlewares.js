const { cors, bodyParser } = require('../midlewares')

module.exports = (app) => {
  app.use(cors)
  app.use(bodyParser)
}
