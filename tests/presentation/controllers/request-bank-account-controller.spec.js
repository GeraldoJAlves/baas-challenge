const { RequestBankAccountController } = require('../../../src/presentation/controllers')
const { AccountAlreadyRequestedError } = require('../../../src/presentation/errors')
const { HttpHelper } = require('../../../src/presentation/helpers')

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
    alreadyRequested = false
    async request (accountId) {
      this.accountId = accountId
      return this.alreadyRequested
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

  test('Should return 500 if requestBankAccountUseCase throws', async () => {
    const { sut, requestBankAccountUseCaseSpy } = makeSut()
    requestBankAccountUseCaseSpy.request = () => { throw new Error() }
    const response = await sut.handle(makeRequest())
    expect(response).toEqual(HttpHelper.serverError())
  })

  test('Should return 409 if the account already requested', async () => {
    const { sut, requestBankAccountUseCaseSpy } = makeSut()
    requestBankAccountUseCaseSpy.alreadyRequested = true
    const response = await sut.handle(makeRequest())
    expect(response).toEqual(HttpHelper.conflict(new AccountAlreadyRequestedError()))
  })
})
