const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Details } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');
const sendEmail = require('../utils/mailer.js');

// Everything below this line is protected by the adminAuthorization middleware
router.use(authorization);

router.get('/orderConfirm/:id', async (req, res) => {

    const orderId = req.params.id;

    // Get order details
    const orderDetails = await Details.findAll({
        where: {
            OrderId: orderId
        },
        include: {
            model: Product
        }
    });

    res.json('Order confirmed!   ' + orderDetails);

    // Send email
    const toEmail = req.user.email;
    const subject = 'Order confirmation';
    const text = 'This is a test email from Nodemailer.';

    sendEmail(toEmail, subject, text)
        .then(() => {
            console.log('Email sent successfully');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });
});


module.exports = router;
