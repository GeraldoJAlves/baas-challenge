module.exports = {
  S3: class S3 {
    constructor (credentials) {
      this.credentials = credentials
    }

    fileLocation = 'any_file_location'
    async upload (config) {
      this.config = config
      return this.fileLocation
    }
  }
}
