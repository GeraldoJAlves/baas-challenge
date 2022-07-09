const { InvalidParamError, MissingParamError } = require('../../../src/presentation/errors')
const { CompareFieldsValidation } = require('../../../src/validation/validators')

const makeSut = (field, fieldToCompare) => {
  const sut = new CompareFieldsValidation(field, fieldToCompare)
  return { sut }
}

describe('Compare Fields Validation', () => {
  test('Should return an error if input does not have equal fields', () => {
    const { sut } = makeSut('field1', 'field2')
    const error = sut.validate({
      field1: 'ab',
      field2: 'ac',
      field3: 'ab'
    })
    expect(error).toEqual(new InvalidParamError('field2'))
  })

  test('Should return an error if input does not have fieldName', () => {
    const { sut } = makeSut('field1', 'field2')
    const error = sut.validate({
      field2: 'ac'
    })
    expect(error).toEqual(new MissingParamError('field1'))
  })

  test('Should return an error if input does not have fieldToCompareName', () => {
    const { sut } = makeSut('field1', 'field2')
    const error = sut.validate({
      field1: 'ab'
    })
    expect(error).toEqual(new MissingParamError('field2'))
  })

  test('Should return fasly if input have equal fields', () => {
    const { sut } = makeSut('field1', 'field3')
    const error = sut.validate({
      field1: 'ab',
      field2: 'ac',
      field3: 'ab'
    })
    expect(error).toBeFalsy()
  })
})
