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

  test('Should enable CORS', async () => {
    const app = await setupApp()
    app.get('/test_cors', (req, res) => res.send(''))
    const response = await supertest(app)
      .get('/test_cors')

    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
  })

  test('Should body parser as json', async () => {
    const app = await setupApp()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    const response = await supertest(app)
      .post('/test_body_parser')
      .send({ field: 'any_value' })

    expect(response.body).toEqual({ field: 'any_value' })
  })
})
