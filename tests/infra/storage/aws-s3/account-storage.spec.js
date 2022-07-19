const { AccountStorage } = require('../../../../src/infra/storage/aws-s3')

const makeSut = () => {
  const storageSpy = makeStorageSpy()
  const sut = new AccountStorage({
    storage: storageSpy
  })
  return { sut, storageSpy }
}

const makeStorageSpy = () => {
  class Storage {
    async upload ({ key, file }) {
      this.file = file
      this.key = key
      return this.filePath
    }
  }
  return new Storage()
}

const makeDocument = () => ({
  name: 'any_document',
  mimetype: 'application/pdf',
  data: 'content_file'
})

describe('Account Storage', () => {
  test('Should call storage with correct values', async () => {
    const { sut, storageSpy } = makeSut()
    const document = makeDocument()
    await sut.uploadDocument({ fileKey: 'any_key_file', document })
    expect(storageSpy.key).toBe('any_key_file')
    expect(storageSpy.file).toBe(document)
  })

  test('Should return documentPath if storage succeeds', async () => {
    const { sut, storageSpy } = makeSut()
    const document = makeDocument()
    const documentPath = await sut.uploadDocument({ fileKey: 'any_key_file', document })
    expect(documentPath).toBe(storageSpy.documentPath)
  })

  test('Should throw if storage throws', async () => {
    const { sut, storageSpy } = makeSut()
    storageSpy.upload = async () => { throw new Error() }
    const document = makeDocument()
    const promise = sut.uploadDocument({ fileKey: 'any_key_file', document })
    expect(promise).rejects.toThrow()
  })
})
