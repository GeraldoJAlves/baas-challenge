module.exports = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string'
    },
    birthDate: {
      type: 'string',
      format: 'date'
    },
    fatherName: {
      type: 'string'
    },
    motherName: {
      type: 'string'
    },
    rg: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    cep: {
      type: 'string'
    }
  },
  required: ['fullName', 'birthDate', 'motherName', 'fatherName', 'cpf', 'rg']
}
