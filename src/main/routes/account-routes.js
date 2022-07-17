const { expressRouteAdapter } = require('../adapters')
const { makeSaveAccountDetailsController } = require('../factories')
const { userAuth } = require('../midlewares')

module.exports = (router) => {
  router.post('/account-details', userAuth, expressRouteAdapter(makeSaveAccountDetailsController()))
}
