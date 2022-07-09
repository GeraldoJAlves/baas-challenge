const { Router } = require('express')
const { readdirSync } = require('fs')
const { join } = require('path')

module.exports = (app) => {
  const router = Router()
  app.use('/api', router)
  readdirSync(join(__dirname, '../routes')).map(async file => {
    await require(`../routes/${file}`)(router)
  })
}
