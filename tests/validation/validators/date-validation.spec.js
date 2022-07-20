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
})
