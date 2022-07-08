const { MongoHelper } = require('../infra/db/mongodb')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await require('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => console.log('Server running'))
  })
  .catch(console.error)
