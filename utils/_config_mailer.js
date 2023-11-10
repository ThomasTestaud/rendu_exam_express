const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'your_email@gmail.com', // Your email
        pass: 'your_password' // Your email password or app password
    }
});

module.exports = transporter;
