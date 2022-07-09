module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/baas-challenge',
  port: process.env.PORT || 5050,
  salt: 12,
  jwtSecret: process.env.JWT_SECRET || 'KEt8Ir$!umS+HSX*~!Og4=sE8E?7^*'
}
