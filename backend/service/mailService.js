require("dotenv").config()
// const nodemailer = require('nodemailer');
const emailjs = require('@emailjs/browser');

class EmailService {
    async sendActivationMail(name, to, link) {
        var templateParams = {
            to_email: to,
            to_name: name,
            from_name: "Chatter",
            message: link,
        };

        await emailjs.send(process.env.EMAILJS_SERVIE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams, process.env.EMAILJS_PUBLIC_KEY).then((result) => {
            console.log(`MAIL SEND to ${to}, STATUS: ${result.status}`);
        }, (error) => {
            console.log(error);
        })
    }
}

module.exports = new EmailService();