const { InvalidParamError } = require('../../../src/presentation/errors')
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
})
