require("dotenv").config()
const auth = require("./auth")
const email = require("./email")

const express = require("express")
const app = express()


app.use(express.json())


async function AuthMiddleware(req, res, next) {
    const apiKey = req.body.api_secret
    const valid = await auth.validAPIKey(apiKey)
    if (valid) {
        console.log("valid api key")
        next()
    } else {
        console.log("tried to acces with invalid api key")
        res.sendStatus(403)
    }
}

app.use("/", AuthMiddleware)

app.post("/", async (req, res) => {
    let to = req.body.to
    let html = req.body.html
    let subject = req.body.subject

    await email.SendMail([to], subject, "", html)
    res.sendStatus(200)
})


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
})