const { expressRouteAdapter } = require('../adapters')
const {
  makeSaveAccountDetailsController,
  makeLoadAccountDetailsController,
  makeSaveAccountDocumentController
} = require('../factories')
const { userAuth } = require('../midlewares')

module.exports = (router) => {
  router.post('/account/details', userAuth, expressRouteAdapter(makeSaveAccountDetailsController()))
  router.get('/account/details', userAuth, expressRouteAdapter(makeLoadAccountDetailsController()))
  router.post('/account/document', userAuth, expressRouteAdapter(makeSaveAccountDocumentController()))
}
