const validator = require('validator')
const { DateValidatorAdapter } = require('../../../src/infra/validators')

const makeSut = () => {
  const sut = new DateValidatorAdapter()
  return { sut }
}

describe('Date Validator Adapter', () => {
  test('Should call validator with correct date', () => {
    const { sut } = makeSut()
    sut.isValid('any_date', 'YYYY-MM-DD')
    expect(validator.date).toBe('any_date')
    expect(validator.options.format).toBe('YYYY-MM-DD')
  })

  test('Should return true if Validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid_date')
    expect(isValid).toBeTruthy()
  })

  test('Should return false if Validator returns false', () => {
    const { sut } = makeSut()
    validator.isDateValid = false
    const isValid = sut.isValid('invalid_date')
    expect(isValid).toBeFalsy()
  })

  test('Should throw if no date is provided', () => {
    const { sut } = makeSut()
    expect(() => { sut.isValid() }).toThrow()
  })

  test('Should throw if Validator throws', () => {
    const { sut } = makeSut()
    validator.isDate = () => { throw new Error() }
    expect(() => sut.isValid('any_date')).toThrow()
  })
})
