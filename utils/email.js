const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    // 1) Create a transporter
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    //// gmail
    // const transport = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     secure: true,
    //     auth: {
    //         type: 'OAuth2',
    //         user: process.env.EMAIL_USER,
    //         clientId: process.env.EMAIL_clientId,
    //         clientSecret: process.env.EMAIL_clientSecret,
    //         refreshToken: process.env.EMAIL_refreshToken,
    //         accessToken: process.env.EMAIL_accessToken,
    //     },
    // });

    // 2) Define the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        //text: options.message,
        html: options.message,
    };

    // 3) Send the email
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });
};

module.exports = sendEmail;