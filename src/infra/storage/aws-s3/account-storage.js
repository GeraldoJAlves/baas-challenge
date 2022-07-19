module.exports = class AccountStorage {
  constructor ({ storage }) {
    this.storage = storage
  }

  async uploadDocument ({ fileKey, document }) {
    return await this.storage.upload({ key: fileKey, file: document })
  }
}
