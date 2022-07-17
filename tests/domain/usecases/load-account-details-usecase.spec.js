const { LoadAccountDetailsUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const loadAccountDetailsRepositorySpy = makeLoadAccountDetailsRepositorySpy()
  const sut = new LoadAccountDetailsUseCase({
    loadAccountDetailsRepository: loadAccountDetailsRepositorySpy
  })
  return {
    sut,
    loadAccountDetailsRepositorySpy
  }
}

const makeLoadAccountDetailsRepositorySpy = () => {
  class LoadAccountDetailsRepository {
    account = {
      fullName: 'any_name',
      birthDate: '2000-01-01',
      fatherName: 'any_father_name',
      motherName: 'any_mother_name',
      rg: '12934'
    }

    async loadDetails (accountId) {
      this.accountId = accountId
      return this.account
    }
  }

  return new LoadAccountDetailsRepository()
}

describe('Load Account Details Usecase', () => {
  test('Should call loadAccountDetailsRepository with correct accountId', async () => {
    const { sut, loadAccountDetailsRepositorySpy } = makeSut()
    await sut.load('any_id')
    expect(loadAccountDetailsRepositorySpy.accountId).toBe('any_id')
  })

  test('Should throw if loadAccountDetailsRepository throws', async () => {
    const { sut, loadAccountDetailsRepositorySpy } = makeSut()
    loadAccountDetailsRepositorySpy.loadDetails = () => { throw new Error() }
    const promise = sut.load('any_id')
    expect(promise).rejects.toThrow()
  })
})
