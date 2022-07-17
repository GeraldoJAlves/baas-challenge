const { SaveAccountDocumentController } = require('../../../src/presentation/controllers')

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
})
