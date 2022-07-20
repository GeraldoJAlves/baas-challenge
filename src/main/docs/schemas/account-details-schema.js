module.exports = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
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
  required: []
}
