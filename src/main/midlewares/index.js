const bodyParser = require('./body-parser')
const contentType = require('./content-type')
const cors = require('./cors')
const userAuth = require('./user-auth')

module.exports = {
  cors,
  bodyParser,
  contentType,
  userAuth
}
