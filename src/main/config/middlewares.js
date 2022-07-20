const { cors, bodyParser, contentType, fileUpload } = require('../middlewares')

module.exports = (app) => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
  app.use(fileUpload)
}
