const { MongoHelper } = require('../infra/db/mongodb')
const { AWSS3Helper } = require('../infra/storage/aws-s3')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    AWSS3Helper.authorize(
      env.AWSConfigs.credentials,
      env.AWSConfigs.endpoint,
      env.AWSConfigs.bucketName
    )
    const setupApp = await require('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => console.log('Server running'))
  })
  .catch(console.error)
