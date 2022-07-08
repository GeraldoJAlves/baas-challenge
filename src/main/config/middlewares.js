const { cors, bodyParser, contentType } = require('../midlewares')

module.exports = (app) => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
