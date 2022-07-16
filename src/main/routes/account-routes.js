const { expressRouteAdapter } = require('../adapters')
const { makeAccountDetailsController } = require('../factories')
const { userAuth } = require('../midlewares')

module.exports = (router) => {
  router.post('/account-details', userAuth, expressRouteAdapter(makeAccountDetailsController()))
}
