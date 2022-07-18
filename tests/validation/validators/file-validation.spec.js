const { MissingParamError } = require('../../../src/presentation/errors')
const { FileValidation } = require('../../../src/validation/validators')

const makeSut = (fieldName = 'document', mimeType = 'application/pdf') => {
  const sut = new FileValidation({
    fieldName,
    mimeType
  })
  return { sut }
}

const makeInput = () => ({
  document: {
    name: 'any_name',
    mimetype: 'any_name',
    data: 'content_data'
  }
})

describe('File Validation', () => {
  test('Should return an error if field does not exist', async () => {
    const { sut } = makeSut('another_document')
    const error = sut.validate(makeInput())
    expect(error).toEqual(new MissingParamError('another_document'))
  })
})
