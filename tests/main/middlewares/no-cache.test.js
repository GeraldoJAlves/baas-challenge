const supertest = require('supertest')
const setupApp = require('../../../src/main/config/app')
const { noCache } = require('../../../src/main/middlewares')

describe('No Cache Middleware', () => {
  test('Should disable cache', async () => {
    const app = await setupApp()
    app.get('/test_no_cache', noCache, (req, res) => res.send(''))
    await supertest(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
