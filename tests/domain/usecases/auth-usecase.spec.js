const { AuthUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const sut = new AuthUseCase()
  return { sut }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow()
  })
})
