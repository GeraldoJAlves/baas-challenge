const { BcryptAdapater } = require('../../../src/infra/cryptography')
const bcrypt = require('bcrypt')

const makeSut = () => {
  const sut = new BcryptAdapater()
  return { sut }
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct value', async () => {
    const { sut } = makeSut()
    await sut.compare('any_password', 'hashed_password')
    expect(bcrypt.plaintext).toBe('any_password')
    expect(bcrypt.digest).toBe('hashed_password')
  })

  test('Should throw if Bcrypt throws', async () => {
    const { sut } = makeSut()
    bcrypt.compare = async () => { throw new Error() }
    const promise = sut.compare('any_password', 'hashed_password')
    expect(promise).rejects.toThrow()
  })
})
