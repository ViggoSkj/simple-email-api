require("dotenv").config()
const auth = require("./auth")
const email = require("./email")

const express = require("express")
const app = express()


app.use(express.json())


async function AuthMiddleware(req, res, next) {
    const apiSecret = req.body.api_secret

    if (typeof apiSecret == undefined) {
        res.statusMessage = "Didn't set body parameter 'api_secret'."
        res.sendStatus(403).end()
    }

    const valid = await auth.validAPIKey(apiSecret)
    if (valid) {
        console.log("valid api api secret")
        next()
    } else {
        console.log("tried to acces with invalid api secret")
        res.statusMessage = "Invalid api secret"
        res.sendStatus(403)
    }
}

app.use("/", AuthMiddleware)

app.post("/", async (req, res) => {
    let to = req.body.to
    let html = req.body.html
    let subject = req.body.subject

    if (typeof to === undefined) {
        res.statusMessage = "Didn't set body parameter 'to'."
        res.sendStatus(400).end()
        return
    } else if (typeof html === undefined) {
        res.statusMessage = "Didn't set body parameter 'html'."
        res.sendStatus(400).end()
        return
    } else if (typeof subject === undefined) {
        res.statusMessage = "Didn't set body parameter 'subject'."
        res.sendStatus(400).end()
        return
    }

    await email.SendMail([to], subject, "", html)
    res.sendStatus(200)
})


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
})