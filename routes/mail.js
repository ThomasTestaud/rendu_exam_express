const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Order, Details, Product } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');
const sendEmail = require('../utils/mailer.js');

// Everything below this line is protected by the adminAuthorization middleware
router.use(authorization);

router.get('/orderConfirm/:id', async (req, res) => {

    const orderId = req.params.id;

    try {
        // Get order details
        const order = await Order.findOne({
            where: {
                id: orderId
            },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Send email
        const toEmail = req.user.email;
        const subject = 'Order confirmation';
        const text = `Hello ${req.user.username}, your order for a total of ${order.total}€ has been confirmed! It will be shipped at ${order.address} as soon as possible!`;

        await sendEmail(toEmail, subject, text);

        
        res.json({ msg: 'Order confirmed!', order: order });

    } catch (error) {
        res.status(500)
        res.json(error);
    }

});


module.exports = router;
