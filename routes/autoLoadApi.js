const express = require('express');
const router = express.Router();
const cron = require('node-cron'); 


const run = false;
if (run){
    cron.schedule('*/2 * * * *', () => {
        console.log('running every 2 minute');
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
}

