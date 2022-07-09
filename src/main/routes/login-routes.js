const { expressRouteAdapter } = require('../adapters')
const { makeLoginController } = require('../factories')

module.exports = (router) => {
  router.post('/login', expressRouteAdapter(makeLoginController()))
}
