const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'apikey',
            pass: process.env.SEND_GRID_API_KEY
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: option.email,
        subject: option.subject,
        text: option.message,
        trackingSettings: {
            clickTracking: { enable: false, enableText: false },
        }
    }
    await transporter.sendMail(mailOptions);
}


module.exports = sendEmail;