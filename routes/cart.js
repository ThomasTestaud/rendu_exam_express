const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Cart } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');

// Everything below this line is protected by the adminAuthorization middleware
router.use(authorization);

router.get('/', async (req, res) => {

    const UserId = req.user.id;

    Cart.findAll({
        where: {
            UserId
        }
    }).then((cart) => {
        res.json(cart);
    }).catch((err) => {
        res.status(400).json(err);
    });

});

router.post('/', async (req, res) => {

    const ProductId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);
    const UserId = req.user.id;

    //find cart where userId and productId
    Cart.findOne({
        where: {
            [Op.and]: [
                {UserId},
                {ProductId}
            ]
        }
    }).then((cart) => {
        if(cart) {
            //update quantity
            Cart.update({
                quantity: cart.quantity + quantity
            }, {
                where: {
                    id: cart.id
                }
            }).then((cart) => {
                res.json('Cart updated');
            }).catch((err) => {
                res.status(400).json(err);
            });
        } else {
            //create cart
            Cart.create({
                ProductId,
                quantity,
                UserId
            }).then((cart) => {
                res.json('Item added to cart');
            }).catch((err) => {
                res.status(400).json(err);
            });
        }
    }).catch((err) => {
        res.status(400).json(err);
    });

});

router.patch('/:id', async (req, res) => {

    const id = Number(req.params.id);
    const quantity = Number(req.body.quantity);

    Cart.update({
        quantity
    }, {
        where: {
            id
        }
    }).then((cart) => {
        res.json('Cart updated');
    }).catch((err) => {
        res.status(400).json(err);
    });

});

router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id);

    Cart.destroy({
        where: {
            id
        }
    }).then((cart) => {
        res.json('Item deleted from cart');
    }).catch((err) => {
        res.status(400).json(err);
    });

});



module.exports = router;
