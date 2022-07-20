const { AddAccountUseCase } = require('../../../src/domain/usecases')

const makeSut = () => {
  const checkAccountByEmailRepositorySpy = makeCheckAccountByEmailRepositorySpy()
  const hasherSpy = makeHasherSpy()
  const addAccountRepositorySpy = makeAddAccountRepositorySpy()
  const sut = new AddAccountUseCase({
    checkAccountByEmailRepository: checkAccountByEmailRepositorySpy,
    hasher: hasherSpy,
    addAccountRepository: addAccountRepositorySpy
  })
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  }
}

const makeCheckAccountByEmailRepositorySpy = () => {
  class CheckAccountByEmailRepository {
    checkByEmail (email) {
      this.email = email
      return this.exists
    }
  }
  return new CheckAccountByEmailRepository()
}

const makeAddAccountRepositorySpy = () => {
  class AddAccountRepository {
    isValid = true
    async add ({ name, email, password, role }) {
      this.name = name
      this.email = email
      this.password = password
      this.role = role
      return this.isValid
    }
  }
  return new AddAccountRepository()
}

const makeHasherSpy = () => {
  class Hasher {
    encryptedHash = 'encrypted_hash'
    async hash (password) {
      this.password = password
      return this.encryptedHash
    }
  }
  return new Hasher()
}

describe('Add Account Usecase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      name: 'any_name',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.add({
      email: 'any_email@email.com',
      name: 'any_name'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no checkAccountByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase({
      hasher: makeHasherSpy(),
      addAccountRepository: makeAddAccountRepositorySpy()
    })
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if an invalid checkAccountByEmailRepository is provided', async () => {
    const sut = new AddAccountUseCase({
      hasher: makeHasherSpy(),
      addAccountRepository: makeAddAccountRepositorySpy(),
      AddAccountUseCase: {}
    })
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call checkAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(checkAccountByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should return false if checkAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.exists = true
    const isValid = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(isValid).toBeFalsy()
  })

  test('Should throw if no dependencies are provided', async () => {
    const sut = new AddAccountUseCase()
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(hasherSpy.password).toBe('any_password')
  })

  test('Should throw if no hasher is provided', async () => {
    const sut = new AddAccountUseCase({
      checkAccountByEmailRepository: makeCheckAccountByEmailRepositorySpy(),
      addAccountRepository: makeAddAccountRepositorySpy()
    })
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if an invalid hasher is provided', async () => {
    const sut = new AddAccountUseCase({
      checkAccountByEmailRepository: makeCheckAccountByEmailRepositorySpy(),
      addAccountRepository: makeAddAccountRepositorySpy(),
      hasher: {}
    })
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call addAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      role: 'other_role',
      password: 'any_password'
    })
    expect(addAccountRepositorySpy.name).toBe('any_name')
    expect(addAccountRepositorySpy.email).toBe('any_email@email.com')
    expect(addAccountRepositorySpy.role).toBe('other_role')
    expect(addAccountRepositorySpy.password).toBe(hasherSpy.encryptedHash)
  })

  test('Should call addAccountRepository with user role if role is not provided', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(addAccountRepositorySpy.name).toBe('any_name')
    expect(addAccountRepositorySpy.email).toBe('any_email@email.com')
    expect(addAccountRepositorySpy.role).toBe('user')
    expect(addAccountRepositorySpy.password).toBe(hasherSpy.encryptedHash)
  })

  test('Should return false if addAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.isValid = false
    const isValid = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(isValid).toBeFalsy()
  })

  test('Should return true if addAccountRepository returns true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(isValid).toBeTruthy()
  })

  test('Should throw if no addAccountRepository is provided', async () => {
    const sut = new AddAccountUseCase({
      checkAccountByEmailRepository: makeCheckAccountByEmailRepositorySpy(),
      hasher: makeHasherSpy()
    })
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should throw if an invalid addAccountRepository is provided', async () => {
    const sut = new AddAccountUseCase({
      checkAccountByEmailRepository: makeCheckAccountByEmailRepositorySpy(),
      hasher: makeHasherSpy(),
      addAccountRepository: {}
    })
    const promise = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(promise).rejects.toThrow()
  })
})
