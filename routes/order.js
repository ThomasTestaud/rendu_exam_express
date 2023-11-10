const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Order } = require('../models/index.js');
const { Cart, Product, Details, User } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');
const adminAuthorization = require('../middlewares/admin_authorization.js');


// Everything below this line is protected by the Authorization middleware
router.use(authorization);

router.get('/', async (req, res) => {

    const UserId = req.user.id;

    Order.findAll({
        where: {
            UserId
        },
        include: {
            model: Details,
            include: Product
        }
    }).then((Order) => {
        res.json(Order);
    }).catch((err) => {
        res.status(400).json(err);
    });

});

router.post('/', async (req, res) => {

    const address = req.body.address;
    const UserId = req.user.id;

    try {
        // Get user's cart
        const cart = await Cart.findAll({
            where: {
                UserId
            },
            include: Product,
        });

        // Calculate total
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity * item.Product.price;
        });

        // Create Order
        const createdOrder = await Order.create({
            address,
            total,
            UserId
        });

        // Update product quantity and create order details
        for (const item of cart) {
            // Create order details
            const details = await Details.create({
                quantity: item.quantity,
                pricePerArticle: item.Product.price,
                OrderId: createdOrder.id,
                ProductId: item.Product.id
            });

            // Update product quantity
            await Product.update({
                stock: item.Product.stock - item.quantity
            }, {
                where: {
                    id: item.Product.id
                }
            });

            // Delete cart
            await Cart.destroy({
                where: {
                    id: item.id
                }
            });

            // Update boughtAmount by the amount of bought products
            await Product.increment('boughtAmount', {
                by: item.quantity,
                where: {
                    id: item.Product.id
                }
            });
            
        }

        //res.json(createdOrder);

        // Send email by redirection to /orderConfirm/:id
        res.redirect(`/mail/orderConfirm/${createdOrder.id}`);

    } catch (err) {
        res.status(400).json(err);
    }
});

// Everything below this line is protected by the adminAuthorization middleware
router.use(adminAuthorization);

router.get('/all', async (req, res) => {

    Order.findAll({
        include: { all: true, nested: true }
    }).then((orders) => {
        res.json(orders);
    }).catch((err) => {
        res.status(400).json(err);
    });


});


module.exports = router;
