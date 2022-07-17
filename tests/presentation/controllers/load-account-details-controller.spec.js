const { LoadAccountDetailsController } = require('../../../src/presentation/controllers')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const loadAccountDetailsUseCaseSpy = makeLoadAccountDetailsUseCaseSpy()
  const sut = new LoadAccountDetailsController({
    loadAccountDetailsUseCase: loadAccountDetailsUseCaseSpy
  })
  return {
    sut,
    loadAccountDetailsUseCaseSpy
  }
}

const makeLoadAccountDetailsUseCaseSpy = () => {
  class LoadAccountDetailsUseCase {
    account = {
      fullName: 'any_fullname',
      birthDate: 'any_birthdate',
      motherName: 'any_mothername',
      fatherName: 'any_fathername'
    }

    async load (accountId) {
      this.accountId = accountId
      return this.account
    }
  }
  return new LoadAccountDetailsUseCase()
}

describe('Load Account Details Controller', () => {
  test('Should call loadAccountDetailsUseCase with correct accountId', async () => {
    const { sut, loadAccountDetailsUseCaseSpy } = makeSut()
    await sut.handle({
      accountId: 'any_id'
    })
    expect(loadAccountDetailsUseCaseSpy.accountId).toBe('any_id')
  })

  test('Should return 500 if loadAccountDetailsUseCase throws', async () => {
    const { sut, loadAccountDetailsUseCaseSpy } = makeSut()
    loadAccountDetailsUseCaseSpy.load = async () => { throw new Error() }
    const response = await sut.handle({
      accountId: 'any_id'
    })
    expect(response).toEqual(HttpHelper.serverError())
  })
})
