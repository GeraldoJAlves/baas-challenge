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
})
