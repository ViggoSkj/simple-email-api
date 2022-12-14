const nodemailer = require("nodemailer")

let env = process.env
const senderConfig = {
    email: env.SENDER,
    password: env.SENDER_PASSWORD,
}

///////////////////////////////////////////////////////////////
///////////////  NodeMailer
///////////////////////////////////////////////////////////////

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: senderConfig.email,
        pass: senderConfig.password
    }
})
transporter.verify().then(res => {
    if (res == true) console.log("Succefully loged into no-reply email")
}).catch(console.error) // TODO change console.log to own logger

async function SendMail(to, subject="no-reply", text="", html="") {
    try {
        const recivers = to.join(", ")

        const data = {
            from: senderConfig.emai,
            to: recivers,
            subject: subject,
            text: text,
            html: html
        }

        const result = await transporter.sendMail(data)
        return result
    } catch(err) {
        console.Error("Could not send email", err)
        throw err
    }
}


module.exports = {
    SendMail
}