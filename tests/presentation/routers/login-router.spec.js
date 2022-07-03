const { LoginRouter } = require('../../../src/presentation/routers')

const makeSut = () => {
  const sut = new LoginRouter()
  return {
    sut
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
