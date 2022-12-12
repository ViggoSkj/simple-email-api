const Query = require("./db").Query
const uuid = require("uuid")
const hasher = require("./hash")

async function validAPIKey(apiKey) {
    try {
        let apiKeys = (await Query("SELECT `key` FROM api_key"))[0]
        
        let promises = []
        apiKeys.forEach(key => {
            promises.push(hasher.compare(apiKey, key.key))
        });

        let results = await Promise.all(promises)

        let valid = false
        results.forEach(res => {
            console.log(res)
            if (res === true) {
                valid = true
            }
        });

        return valid
    } catch(err) {
        console.log(err)
        return false
    }
}

async function generateAPIKey() {
    let newKey = uuid.v4()
    let hash = await hasher.hash(newKey)
    await Query("INSERT INTO api_key (`key`) VALUES (?)", [hash])
    return newKey
}

module.exports = {
    validAPIKey,
    generateAPIKey,
}