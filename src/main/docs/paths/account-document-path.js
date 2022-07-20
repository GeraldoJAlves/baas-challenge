module.exports = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Documento'],
    summary: 'API para cadastrar documento pessoal',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/accountDocumentParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Arquivo salvo com sucesso'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
