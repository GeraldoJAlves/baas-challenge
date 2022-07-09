const { SignupController } = require('../../../src/presentation/controllers')
const { HttpHelper } = require('../../../src/presentation/helpers')

const makeSut = () => {
  const addAccountUseCaseSpy = makeAddAccountUseCaseSpy()
  const sut = new SignupController({
    addAccountUseCase: addAccountUseCaseSpy
  })
  return {
    sut,
    addAccountUseCaseSpy
  }
}

const makeAddAccountUseCaseSpy = () => {
  class AddAccountUseCaseSpy {
    async add ({ name, email, password }) {
      this.name = name
      this.email = email
      this.password = password
      return this.isValid
    }
  }

  return new AddAccountUseCaseSpy()
}

const makeHttpRequest = () => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

describe('Signup Controller', () => {
  test('Should call addAccountUseCase with correct values', async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(addAccountUseCaseSpy.name).toBe(httpRequest.body.name)
    expect(addAccountUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(addAccountUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 500 if no addAccountUseCase is provided', async () => {
    const sut = new SignupController()
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })

  test('Should return 500 if an invalid addAccountUseCase is provided', async () => {
    const sut = new SignupController({
      addAccountUseCase: {}
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })
})
