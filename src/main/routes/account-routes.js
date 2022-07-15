const { expressRouteAdapter } = require('../adapters')
const { makeAccountDetails } = require('../factories')

module.exports = (router) => {
  router.post('/account-details', expressRouteAdapter(makeAccountDetails()))
}
