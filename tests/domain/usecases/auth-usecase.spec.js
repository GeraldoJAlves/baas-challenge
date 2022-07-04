const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError } = require('../../../src/presentation/errors')

const makeSut = () => {
  const sut = new AuthUseCase()
  return { sut }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
