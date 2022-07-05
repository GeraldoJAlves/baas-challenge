const { JwtAdapter } = require('../../../src/infra/cryptography')
const jwt = require('jsonwebtoken')

const makeSut = (secret = 'any_secret') => {
  const sut = new JwtAdapter(secret)
  return { sut }
}

describe('Jwt Adapter', () => {
  test('Should call jsonwebtoken with correct value', async () => {
    const { sut } = makeSut('valid_secret')
    await sut.encrypt('any_id')
    expect(jwt.data.id).toBe('any_id')
    expect(jwt.secret).toBe('valid_secret')
  })

  test('Should throw if no secret is provided', async () => {
    const { sut } = makeSut('')
    const promise = sut.encrypt('any_id')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.encrypt('')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if jsonwebtoken throws', async () => {
    const { sut } = makeSut()
    jwt.sign = async () => { throw new Error() }
    const promise = sut.encrypt('any_id')
    expect(promise).rejects.toThrow()
  })
})
