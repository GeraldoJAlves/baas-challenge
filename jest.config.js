module.exports = {
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/main/server.js',
    '!**/src/main/config/env.js'
  ],
  preset: '@shelf/jest-mongodb'
}
