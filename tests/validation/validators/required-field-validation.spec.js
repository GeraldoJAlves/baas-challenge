const { MissingParamError } = require('../../../src/presentation/errors')
const { RequiredFieldValidation } = require('../../../src/validation/validators')

const makeSut = (field = 'email') => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

const makeInput = () => ({
  email: 'any_email@email.com',
  password: 'any_email@email.com'
})

describe('Required Field Validation', () => {
  test('Should return false if field is provided', () => {
    const { sut } = makeSut()
    const input = makeInput()
    const error = sut.validate(input)
    expect(error).toBeFalsy()
  })

  test('Should return an MissingParamError if no field is provided', () => {
    const { sut } = makeSut()
    const input = { password: 'any_password' }
    const error = sut.validate(input)
    expect(error).toEqual(new MissingParamError('email'))
  })

  test('Should return an MissingParamError if field has an empty string', () => {
    const { sut } = makeSut()
    const input = { email: '' }
    const error = sut.validate(input)
    expect(error).toEqual(new MissingParamError('email'))
  })

  test('Should throw if no input is provided', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.validate()
    }).toThrow()
  })

  test('Should throw if no dependencies are provided', () => {
    const sut = new RequiredFieldValidation()
    expect(() => {
      sut.validate()
    }).toThrow()
  })
})
