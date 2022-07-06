const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri) {
    this.uri = uri
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect()
    this.client = client
  },

  async disconnect () {
    await this.client.close()
    this.client = null
  },

  getCollection (name) {
    return this.client.db().collection(name)
  },

  map: (data) => {
    const { _id, ...rest } = data
    return { ...rest, id: _id }
  }
}
