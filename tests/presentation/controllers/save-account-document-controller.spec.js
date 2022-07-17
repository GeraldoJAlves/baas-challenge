const { SaveAccountDocumentController } = require('../../../src/presentation/controllers')
const { MissingParamError } = require('../../../src/presentation/errors')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const validationSpy = makeValidationSpy()
  const uploadAccountDocumentUseCaseSpy = makeUploadAccountDocumentUseCaseSpy()
  const sut = new SaveAccountDocumentController({
    uploadAccountDocumentUseCase: uploadAccountDocumentUseCaseSpy,
    validation: validationSpy
  })
  return {
    sut,
    uploadAccountDocumentUseCaseSpy,
    validationSpy
  }
}

const makeValidationSpy = () => {
  class Validation {
    validate (input) {
      this.input = input
      return this.error
    }
  }
  return new Validation()
}

const makeUploadAccountDocumentUseCaseSpy = () => {
  class UploadAccountDocumentUseCase {
    async upload (document) {
      this.document = document
    }
  }
  return new UploadAccountDocumentUseCase()
}

const makeRequest = () => ({
  document: {
    name: 'any_document',
    mimetype: 'application/pdf',
    mv: () => {}
  }
})

describe('Upload Account Document UseCase', () => {
  test('Should call uploadAccountDocumentUseCase with correct document', async () => {
    const { sut, uploadAccountDocumentUseCaseSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(uploadAccountDocumentUseCaseSpy.document).toEqual(request.document)
  })

  test('Should return 204 if uploadAccountDocumentUseCase succeeds', async () => {
    const { sut } = makeSut()
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.noContent())
  })

  test('Should return 500 if uploadAccountDocumentUseCase throws', async () => {
    const { sut, uploadAccountDocumentUseCaseSpy } = makeSut()
    uploadAccountDocumentUseCaseSpy.upload = async () => { throw new Error() }
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.serverError())
  })

  test('Should call validation with correct input', async () => {
    const { sut, validationSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('document')
    const request = makeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.badRequest(validationSpy.error))
  })
})
