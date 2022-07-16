const { AuthMiddleware } = require('../../../presentation/middlewares')
const { makeLoadAccountByTokenUseCase } = require('../usecases')

module.exports = (role = 'user') => {
  return new AuthMiddleware({
    role,
    loadAccountByTokenUseCase: makeLoadAccountByTokenUseCase()
  })
}
