const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express()
app.use(cors())
const port = 3010

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pavvel.potapov@gmail.com',
        pass: 'qefajnoxhxnbqnul',
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/message', async function (req, res) {

    let {message, email, name} = req.body
    let info = await transporter.sendMail({
        from: 'MY PORTFOLIO',
        to: "pavelminsk1979@mail.ru",
        subject: "portfolio",
        html: `<b>Сообщение из моего портфолио</b>
<div>От кого:${name}</div>
<div>Контакт:${email}</div>
<div>Текст сообщения :${message}</div>`,
    });
    console.log('----------------------')
    console.log('send info:',info)
    console.log('----------------------')
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

