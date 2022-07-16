const { expressMiddlewareAdapter } = require('../adapters')
const { makeAuthMiddleware } = require('../factories')

module.exports = expressMiddlewareAdapter(makeAuthMiddleware('user'))
