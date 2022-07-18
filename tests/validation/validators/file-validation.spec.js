const { MissingParamError, InvalidUploadFileError, InvalidFileTypeError } = require('../../../src/presentation/errors')
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
    mimetype: 'application/pdf',
    data: 'content_data'
  }
})

const makeInvalidInput = () => ({
  document: 'other_value'
})

describe('File Validation', () => {
  test('Should return an error if field does not exist', async () => {
    const { sut } = makeSut('another_document')
    const error = sut.validate(makeInput())
    expect(error).toEqual(new MissingParamError('another_document'))
  })

  test('Should return an error if field does not have a file type', async () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInvalidInput())
    expect(error).toEqual(new InvalidUploadFileError('document'))
  })

  test('Should return an error if mimetype not equal', async () => {
    const { sut } = makeSut('document', 'plain/text')
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidFileTypeError('document', 'plain/text'))
  })

  test('Should return false if valid file is provided', async () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInput())
    expect(error).toBeFalsy()
  })
})
