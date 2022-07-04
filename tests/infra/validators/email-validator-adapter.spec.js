const { EmailValidatorAdapter } = require('../../../src/infra/validators')

const makeSut = () => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}

describe('Email Validator Adapter', () => {
  test('Should call Validator with correct param', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('any_email@email.com')
    expect(isValid).toBeTruthy()
  })
})
