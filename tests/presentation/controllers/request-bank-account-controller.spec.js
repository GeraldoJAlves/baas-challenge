const { RequestBankAccountController } = require('../../../src/presentation/controllers')

const makeSut = () => {
  const requestBankAccountUseCaseSpy = makeRequestBankAccountUseCaseSpy()
  const sut = new RequestBankAccountController({
    requestBankAccountUseCase: requestBankAccountUseCaseSpy
  })
  return {
    sut,
    requestBankAccountUseCaseSpy
  }
}

const makeRequestBankAccountUseCaseSpy = () => {
  class RequestBankAccountUseCase {
    async request (accountId) {
      this.accountId = accountId
      return this.isValid
    }
  }
  return new RequestBankAccountUseCase()
}

const makeRequest = () => ({
  accountId: 'any_id'
})

describe('Request Bank Account Controller', () => {
  test('Should call requestBankAccountUseCase with correct value', async () => {
    const { sut, requestBankAccountUseCaseSpy } = makeSut()
    const request = makeRequest()
    await sut.handle(request)
    expect(requestBankAccountUseCaseSpy.accountId).toBe(request.accountId)
  })
})
