const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false //dev only
        }
    })
    const mailOptions = {
        from: 'Qzify support <support@qzify.com>',
        to: option.email,
        subject: option.subject,
        text: option.message,
    }
    await transporter.sendMail(mailOptions);
}


module.exports = sendEmail;