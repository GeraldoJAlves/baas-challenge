const { MissingParamError } = require('../../../src/presentation/errors')
const { RequiredField } = require('../../../src/validation/validators')

const makeSut = (field = 'email') => {
  const sut = new RequiredField(field)
  return {
    sut
  }
}

const makeInput = () => ({
  email: 'any_email@email.com',
  password: 'any_email@email.com'
})

describe('Required Field', () => {
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

  test('Should throw if no input is provided', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.validate()
    }).toThrow()
  })

  test('Should throw if no dependencies are provided', () => {
    const sut = new RequiredField()
    expect(() => {
      sut.validate()
    }).toThrow()
  })
})
