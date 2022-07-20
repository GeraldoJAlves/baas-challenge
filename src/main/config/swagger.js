const { serve, setup } = require('swagger-ui-express')
const swaggerConfig = require('../docs')
const { noCache } = require('../middlewares')

module.exports = (app) => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
