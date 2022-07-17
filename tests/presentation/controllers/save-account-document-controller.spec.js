const { SaveAccountDocumentController } = require('../../../src/presentation/controllers')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const uploadAccountDocumentUseCaseSpy = makeUploadAccountDocumentUseCaseSpy()
  const sut = new SaveAccountDocumentController({
    uploadAccountDocumentUseCase: uploadAccountDocumentUseCaseSpy
  })
  return {
    sut,
    uploadAccountDocumentUseCaseSpy
  }
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

describe('Class Test', () => {
  test('Should calll uploadAccountDocumentUseCase with correct document', async () => {
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
})
