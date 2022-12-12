const bcrypt = require("bcryptjs")


async function hash(string) {
    return await bcrypt.hash(string, 10)
}

async function compare(string, hash) {
    return await bcrypt.compare(string, hash)
}

module.exports = {
    hash,
    compare
}