const { JwtAdapter } = require('../../../src/infra/cryptography')
const jwt = require('jsonwebtoken')

const makeSut = (secret = 'any_secret') => {
  const sut = new JwtAdapter(secret)
  return { sut }
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('Should call jsonwebtoken with correct value', async () => {
      const { sut } = makeSut('valid_secret')
      await sut.encrypt('any_id')
      expect(jwt.data.id).toBe('any_id')
      expect(jwt.secret).toBe('valid_secret')
    })

    test('Should return token when jsonwebtoken returns a token', async () => {
      const { sut } = makeSut('valid_secret')
      const token = await sut.encrypt('any_id')
      expect(token).toBe(jwt.signToken)
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

  describe('decrypt()', () => {
    test('Should call jsonwebtoken with correct token', async () => {
      const { sut } = makeSut('valid_secret')
      await sut.decrypt('any_token')
      expect(jwt.token).toBe('any_token')
      expect(jwt.secret).toBe('valid_secret')
    })

    test('Should throw if no token is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.decrypt()
      expect(promise).rejects.toThrow()
    })

    test('Should throw if no secret is provided', async () => {
      const { sut } = makeSut('')
      const promise = sut.decrypt('any_token')
      expect(promise).rejects.toThrow()
    })
  })
})
