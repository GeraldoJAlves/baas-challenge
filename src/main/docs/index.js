module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Baas Chanllenge',
    version: '1.0.0',
    contact: {
      name: 'Geraldo Alves',
      email: 'geraldo.junior.2007@gmail.com',
      url: 'https://www.linkedin.com/in/geraldo-alves-junior/'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }]
}
