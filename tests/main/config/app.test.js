const supertest = require('supertest')
const setupApp = require('../../../src/main/config/app')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    const app = await setupApp()
    app.get('/test_x_powered_by', (req, res) => res.send(''))
    const { headers } = await supertest(app)
      .get('/test_x_powered_by')

    expect(headers['x-powered-by']).toBeUndefined()
  })

  test('Should enable CORS', async () => {
    const app = await setupApp()
    app.get('/test_cors', (req, res) => res.send(''))
    await supertest(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })

  test('Should body parser as json', async () => {
    const app = await setupApp()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await supertest(app)
      .post('/test_body_parser')
      .send({ field: 'any_value' })
      .expect({ field: 'any_value' })
  })

  test('Should return content type as json', async () => {
    const app = await setupApp()
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await supertest(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
