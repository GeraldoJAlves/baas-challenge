const { expressRouteAdapter } = require('../adapters')
const { makeAccountDetails } = require('../factories')
const { userAuth } = require('../midlewares')

module.exports = (router) => {
  router.post('/account-details', userAuth, expressRouteAdapter(makeAccountDetails()))
}
