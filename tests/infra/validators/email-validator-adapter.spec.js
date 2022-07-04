const validator = require('validator')
const { EmailValidatorAdapter } = require('../../../src/infra/validators')

const makeSut = () => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}

describe('Email Validator Adapter', () => {
  test('Should call Validator with correct param', () => {
    const { sut } = makeSut()
    sut.isValid('any_email@email.com')
    expect(validator.email).toBe('any_email@email.com')
  })

  test('Should return true if Validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBeTruthy()
  })

  test('Should return false if Validator returns false', () => {
    const { sut } = makeSut()
    validator.isEmailValid = false
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBeFalsy()
  })
})
