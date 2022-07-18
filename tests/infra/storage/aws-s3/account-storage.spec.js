const { AccountStorage, AWSS3Helper } = require('../../../../src/infra/storage/aws-s3')

const makeSut = () => {
  const sut = new AccountStorage()
  return { sut }
}

const makeDocument = () => ({
  name: 'any_document',
  mimetype: 'application/pdf',
  data: 'content_file'
})

describe('Account Storage', () => {
  beforeAll(() => {
    AWSS3Helper.authorize('host', '/files')
  })

  test('Should call AWS S3 with correct values', async () => {
    const { sut } = makeSut()
    const document = makeDocument()
    await sut.uploadDocument(document)
    expect(AWSS3Helper.getClient().config).toEqual({
      Bucket: 'account',
      key: document.name,
      Body: document.data,
      ContentType: document.mimetype,
      ACL: 'private'
    })
  })

  test('Should return fileLocation if AWS S3 succeeds', async () => {
    const { sut } = makeSut()
    const document = makeDocument()
    const fileLocation = await sut.uploadDocument(document)
    expect(fileLocation).toBe(AWSS3Helper.getClient().fileLocation)
  })
})
