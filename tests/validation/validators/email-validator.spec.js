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

  test('Should return an InvalidParamError when EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut('email')
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should return false when EmailValidator returns true', () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })
})
