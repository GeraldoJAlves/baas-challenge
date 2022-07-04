const RequiredField = require('../../../src/validation/validators/required-field')

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
})
