const { UploadAccountDocumentUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const uploadAccountDocumentStorageSpy = makeUploadAccountDocumentStorageSpy()
  const sut = new UploadAccountDocumentUseCase({
    uploadAccountDocumentStorage: uploadAccountDocumentStorageSpy
  })
  return {
    sut,
    uploadAccountDocumentStorageSpy
  }
}

const makeUploadAccountDocumentStorageSpy = () => {
  class UploadAccountDocumentStorage {
    path = '/s3/bucket/any_file'
    async upload (document) {
      this.document = document
      return this.path
    }
  }
  return new UploadAccountDocumentStorage()
}

const makeDocument = () => ({
  name: 'any_document',
  mimetype: 'application/pdf',
  mv: () => {}
})

describe('Class Test', () => {
  test('Should call uploadAccountDocumentStorage with correct document', async () => {
    const { sut, uploadAccountDocumentStorageSpy } = makeSut()
    const document = makeDocument()
    await sut.upload(document)
    expect(uploadAccountDocumentStorageSpy.document).toEqual(document)
  })

  test('Should throw if uploadAccountDocumentStorage throws', async () => {
    const { sut, uploadAccountDocumentStorageSpy } = makeSut()
    uploadAccountDocumentStorageSpy.upload = async () => { throw new Error() }
    const document = makeDocument()
    const promise = sut.upload(document)
    expect(promise).rejects.toThrow()
  })
})
