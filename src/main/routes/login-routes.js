const { expressRouteAdapter } = require('../adapters')
const { makeLoginController, makeSignupController } = require('../factories')

module.exports = (router) => {
  router.post('/login', expressRouteAdapter(makeLoginController()))
  router.post('/signup', expressRouteAdapter(makeSignupController()))
}
