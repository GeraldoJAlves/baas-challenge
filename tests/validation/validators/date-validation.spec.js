const { InvalidDateError } = require('../../../src/presentation/errors')
const { DateValidation } = require('../../../src/validation/validators')

const makeSut = (fieldName = 'date', format = 'YYYY-MM-DD') => {
  const dateValidatorSpy = makeDateValidatorSpy()
  const sut = new DateValidation({
    dateValidator: dateValidatorSpy,
    fieldName,
    format
  })
  return {
    sut,
    dateValidatorSpy
  }
}

const makeDateValidatorSpy = () => {
  class DateValidator {
    isDateValid = true
    isValid (date, format) {
      this.date = date
      this.format = format
      return this.isDateValid
    }
  }
  return new DateValidator()
}

const makeInput = () => ({
  date: 'any_date'
})

describe('Date Validation', () => {
  test('Should call dateValidator with correct date', () => {
    const { sut, dateValidatorSpy } = makeSut()
    const input = makeInput('date', 'YYYY-MM-DD')
    sut.validate(input)
    expect(dateValidatorSpy.date).toBe(input.date)
    expect(dateValidatorSpy.format).toBe('YYYY-MM-DD')
  })

  test('Should return an InvalidDateError if dateValidator returns false', () => {
    const { sut, dateValidatorSpy } = makeSut()
    dateValidatorSpy.isDateValid = false
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidDateError('date'))
  })

  test('Should return false if an dateValidator returns true', () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })

  test('Should return false if input no has field', () => {
    const { sut } = makeSut('other')
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })

  test('Should return false if no input is provided', () => {
    const { sut } = makeSut()
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
