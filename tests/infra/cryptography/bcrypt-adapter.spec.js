const { BcryptAdapater } = require('../../../src/infra/cryptography')
const bcrypt = require('bcrypt')

const makeSut = (salt = 'any_salt') => {
  const sut = new BcryptAdapater(salt)
  return { sut }
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call Bcrypt with correct values', async () => {
      const { sut } = makeSut('valid_salt')
      await sut.hash('any_password')
      expect(bcrypt.plaintext).toBe('any_password')
      expect(bcrypt.salt).toBe('valid_salt')
    })

    test('Should return hashed text when Bcrypt returns a hashed text', async () => {
      const { sut } = makeSut()
      const hashedText = await sut.hash('any_password')
      expect(hashedText).toBe(bcrypt.hashedText)
    })

    test('Should throw if no salt is provided', async () => {
      const sut = new BcryptAdapater()
      const promise = sut.hash('any_password')
      expect(promise).rejects.toThrow()
    })

    test('Should throw if no plaintext is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.hash()
      expect(promise).rejects.toThrow()
    })

    test('Should throw if Bcrypt throws', async () => {
      const { sut } = makeSut()
      bcrypt.hash = async () => { throw new Error() }
      const promise = sut.hash('any_password')
      expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call Bcrypt with correct value', async () => {
      const { sut } = makeSut()
      await sut.compare('any_password', 'hashed_password')
      expect(bcrypt.plaintext).toBe('any_password')
      expect(bcrypt.digest).toBe('hashed_password')
    })

    test('Should return true when Bcrypt returns true', async () => {
      const { sut } = makeSut()
      const isValid = await sut.compare('any_password', 'hashed_password')
      expect(isValid).toBeTruthy()
    })

    test('Should return false when Bcrypt returns false', async () => {
      const { sut } = makeSut()
      bcrypt.isValid = false
      const isValid = await sut.compare('invalid_password', 'hashed_password')
      expect(isValid).toBeFalsy()
    })

    test('Should throw if no digest is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.compare('any_password')
      expect(promise).rejects.toThrow()
    })

    test('Should throw if no plaintext is provided', async () => {
      const { sut } = makeSut()
      const promise = sut.compare()
      expect(promise).rejects.toThrow()
    })

    test('Should throw if Bcrypt throws', async () => {
      const { sut } = makeSut()
      bcrypt.compare = async () => { throw new Error() }
      const promise = sut.compare('any_password', 'hashed_password')
      expect(promise).rejects.toThrow()
    })
  })
})
