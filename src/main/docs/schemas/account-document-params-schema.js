module.exports = {
  type: 'object',
  properties: {
    document: {
      type: 'file',
      name: 'document',
      in: 'formData'
    }
  },
  required: ['document']
}
