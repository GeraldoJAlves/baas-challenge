const { AddAccountUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const checkAccountByEmailRepositorySpy = makeCheckAccountByEmailRepositorySpy()
  const sut = new AddAccountUseCase({
    checkAccountByEmailRepository: checkAccountByEmailRepositorySpy
  })
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

const makeCheckAccountByEmailRepositorySpy = () => {
  class CheckAccountByEmailRepository {
    checkByEmail (email) {
      this.email = email
      return this.exists
    }
  }
  return new CheckAccountByEmailRepository()
}

describe('Add Account Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      name: 'any_name',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      email: 'any_email@email.com',
      name: 'any_name'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no checkAccountByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if an invalid checkAccountByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase({})
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })
})
