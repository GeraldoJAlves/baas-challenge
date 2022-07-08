const supertest = require('supertest')
const setupApp = require('../../../src/main/config/app')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    const app = await setupApp()
    app.get('/test_x_powered_by', (req, res) => res.send(''))
    const response = await supertest(app)
      .get('/test_x_powered_by')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})
