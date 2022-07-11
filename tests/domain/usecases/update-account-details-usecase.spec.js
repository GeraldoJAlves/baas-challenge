const { UpdateAccountDetailsUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const updateAccountDetailsRepositorySpy = makeUpdateAccountDetailsRepositorySpy()
  const sut = new UpdateAccountDetailsUseCase({
    updateAccountDetailsRepository: updateAccountDetailsRepositorySpy
  })
  return {
    sut,
    updateAccountDetailsRepositorySpy
  }
}

const makeUpdateAccountDetailsRepositorySpy = () => {
  class UpdateAccountDetailsRepository {
    async updateAccountDetails (data) {
      this.data = data
    }
  }
  return new UpdateAccountDetailsRepository()
}

const makeData = () => ({
  fullName: 'any_name',
  birthDate: '2000-01-01',
  fatherName: 'any_father_name',
  motherName: 'any_mother_name',
  rg: '12934',
  cpf: '1234590',
  address: 'street one, 111',
  city: 'any_city',
  state: 'any_state',
  cep: 'any_cep'
})

describe('Update Account Details Usecase', () => {
  test('Should call updateAccountDetailsRepository with correct values', async () => {
    const { sut, updateAccountDetailsRepositorySpy } = makeSut()
    const data = makeData()
    await sut.update(data)
    expect(updateAccountDetailsRepositorySpy.data).toEqual(data)
  })
})
