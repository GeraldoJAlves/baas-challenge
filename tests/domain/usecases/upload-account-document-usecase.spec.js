const { UploadAccountDocumentUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const uploadAccountDocumentStorageSpy = makeUploadAccountDocumentStorageSpy()
  const updateAccountDocumentRepositorySpy = makeUpdateAccountDocumentRepositorySpy()
  const sut = new UploadAccountDocumentUseCase({
    uploadAccountDocumentStorage: uploadAccountDocumentStorageSpy,
    updateAccountDocumentRepository: updateAccountDocumentRepositorySpy
  })
  return {
    sut,
    uploadAccountDocumentStorageSpy,
    updateAccountDocumentRepositorySpy
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

const makeUpdateAccountDocumentRepositorySpy = () => {
  class UpdateAccountDocumentRepository {
    async updateDocumentPath (path) {
      this.path = path
    }
  }
  return new UpdateAccountDocumentRepository()
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

  test('Should call updateAccountDocumentRepository with correct path', async () => {
    const {
      sut,
      updateAccountDocumentRepositorySpy,
      uploadAccountDocumentStorageSpy
    } = makeSut()
    const document = makeDocument()
    await sut.upload(document)
    expect(updateAccountDocumentRepositorySpy.path).toEqual(uploadAccountDocumentStorageSpy.path)
  })

  test('Should throw if updateAccountDocumentRepository throws', async () => {
    const { sut, updateAccountDocumentRepositorySpy } = makeSut()
    updateAccountDocumentRepositorySpy.updateDocumentPath = async () => { throw new Error() }
    const promise = sut.upload(makeDocument())
    expect(promise).rejects.toThrow()
  })
})
