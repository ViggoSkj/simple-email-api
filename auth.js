const Query = require("db").Query
const uuid = require("uuid")

async function validAPIKey(apiKey) {
    let apiKeys = (await Query("SELECT * FROM api_key WHERE key=?", [apiKey]))[0]
    if (apiKeys.length === 0) return false
    else return true
}

async function generateAPIKey() {
    let newKey = uuid.v4()
    await Query("INSERT INTO api_key (key) VALUES(?)", [newKey])
    return newKey
}

module.exports = {
    validAPIKey,
    generateAPIKey,
}