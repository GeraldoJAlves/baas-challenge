module.exports = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Informações Pessoais'],
    summary: 'API para listar detalhes do usuário',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accountDetails'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Informações Pessoais'],
    summary: 'API para cadastrar detalhes do usuário',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/accountDetailsParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accountDetailsParams'
            }
          }
        }
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
