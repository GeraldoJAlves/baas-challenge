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
    async uploadDocument ({ fileKey, document }) {
      this.fileKey = fileKey
      this.document = document
      return this.path
    }
  }
  return new UploadAccountDocumentStorage()
}

const makeUpdateAccountDocumentRepositorySpy = () => {
  class UpdateAccountDocumentRepository {
    async updateDocumentPath ({ id, documentPath }) {
      this.id = id
      this.documentPath = documentPath
    }
  }
  return new UpdateAccountDocumentRepository()
}

const makeDocument = () => ({
  name: 'any_document',
  mimetype: 'application/pdf',
  mv: () => {}
})

describe('Update Account Document UseCase', () => {
  test('Should call uploadAccountDocumentStorage with correct document', async () => {
    const { sut, uploadAccountDocumentStorageSpy } = makeSut()
    const document = makeDocument()
    await sut.upload({ accountId: 'any_id', document })
    expect(uploadAccountDocumentStorageSpy.fileKey).toEqual('any_id.pdf')
    expect(uploadAccountDocumentStorageSpy.document).toEqual(document)
  })

  test('Should throw if uploadAccountDocumentStorage throws', async () => {
    const { sut, uploadAccountDocumentStorageSpy } = makeSut()
    uploadAccountDocumentStorageSpy.uploadDocument = async () => { throw new Error() }
    const document = makeDocument()
    const promise = sut.upload({ accountId: 'any_id', document })
    expect(promise).rejects.toThrow()
  })

  test('Should call updateAccountDocumentRepository with correct path', async () => {
    const {
      sut,
      updateAccountDocumentRepositorySpy,
      uploadAccountDocumentStorageSpy
    } = makeSut()
    const document = makeDocument()
    await sut.upload({ accountId: 'any_id', document })
    expect(updateAccountDocumentRepositorySpy.id).toEqual('any_id')
    expect(updateAccountDocumentRepositorySpy.documentPath).toEqual(uploadAccountDocumentStorageSpy.path)
  })

  test('Should throw if updateAccountDocumentRepository throws', async () => {
    const { sut, updateAccountDocumentRepositorySpy } = makeSut()
    updateAccountDocumentRepositorySpy.updateDocumentPath = async () => { throw new Error() }
    const promise = sut.upload({ accountId: 'any_id', document: makeDocument() })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no document is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.upload({ accountId: 'any_id' })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no accountId is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.upload()
    expect(promise).rejects.toThrow()
  })
})
