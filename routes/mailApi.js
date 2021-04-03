const { static } = require('express');
const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs').promises;
const path = require('path');


let transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zlatanbouhlel@gmail.com',
        pass: 'Rochedev20323557@'
    }
});
//send mail
router.get('/getmail', function (req, res) {
    const message = {
        from: 'azerty@example.com', // sender address
        to: "rochdi.bouhlel@hotmail.fr,zlatanbouhlel@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "First Node Mail", // plain text body
        html: "<b>Hello from the first nodeMailer Api</b>", // html body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            res.send(message);
            console.log(info);
        }
    });
});

router.get('/getmailText', function (req, res) {
    const message = {
        from: 'azerty@example.com', // sender address
        to: "rochdi.bouhlel@hotmail.fr,zlatanbouhlel@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "First Node Mail", // plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            res.send(message);
            console.log(info);
        }
    });
});


router.get('/getmailv2', async (req, res) => {
    const filepath =  path.resolve('./MailTemplate', 'register.html');
    console.log(filepath);
    const data = await fs.readFile(filepath, "utf-8");
    console.log(data);
    const static = ejs.renderFile(data, {});
    const message = {
        from: 'azerty@example.com', // sender address
        to: "rochdi.bouhlel@hotmail.fr,zlatanbouhlel@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "First Node Mail", // plain text body
        html: static// html body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            res.send(message);
            console.log(info);
        }
    });
});

module.exports = router;