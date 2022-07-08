const { cors } = require('../midlewares')

module.exports = (app) => {
  app.use(cors)
}
