const { EmailValidation } = require('../../../src/validation/validators')
const { InvalidParamError } = require('../../../src/presentation/errors')

const makeSut = (field = 'email') => {
  const emailValidatorSpy = makeEmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

const makeEmailValidatorSpy = () => {
  class EmailValidator {
    isEmailValid = true
    isValid (email) {
      this.email = email
      return this.isEmailValid
    }
  }
  return new EmailValidator()
}

const makeInput = () => ({
  email: 'any_email@email.com'
})

describe('Email Validation', () => {
  test('Should call EmailValidator with correct param', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const input = makeInput()
    sut.validate(input)
    expect(emailValidatorSpy.email).toBe(input.email)
  })

  test('Should return an InvalidParamError if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut('email')
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should return false if an EmailValidator returns true', () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })

  test('Should throw if no dependencies are provided', () => {
    const sut = new EmailValidation()
    expect(() => { sut.validate(makeInput()) }).toThrow()
  })

  test('Should return false if input no has field', () => {
    const { sut } = makeSut('password')
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })

  test('Should return false if no input is provided', () => {
    const { sut } = makeSut('password')
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
