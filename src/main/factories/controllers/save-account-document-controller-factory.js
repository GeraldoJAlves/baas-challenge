const { SaveAccountDocumentController } = require('../../../presentation/controllers')
const { makeUploadAccountDocumentUseCase } = require('../usecases')
const makeSaveAccountDocumentValidation = require('./save-account-document-validation-factory')

module.exports = () => {
  return new SaveAccountDocumentController({
    validation: makeSaveAccountDocumentValidation(),
    uploadAccountDocumentUseCase: makeUploadAccountDocumentUseCase()
  })
}
