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

describe('Email Validation', () => {
  test('Should call EmailValidator with correct param', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email: 'any_email@email.com' })
    expect(emailValidatorSpy.email).toBe('any_email@email.com')
  })

  test('Should return an InvalidParamError when EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate({ email: 'any_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
})
