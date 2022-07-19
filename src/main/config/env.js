module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/baas-challenge',
  port: process.env.PORT || 5050,
  salt: 12,
  jwtSecret: process.env.JWT_SECRET || 'KEt8Ir$!umS+HSX*~!Og4=sE8E?7^*',
  AWSConfigs: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'ACCESSKEYAWSUSER',
      secretAccessKey: process.env.AWS_SECRET_KEY || 'sEcreTKey'
    },
    endpoint: process.env.AWS_S3_SERVER || 'http://localhost:4566',
    bucketName: process.env.AWS_BUCKET_NAME || 'account-files',
    region: process.env.AWS_REGION || 'us-east-1'
  }
}
