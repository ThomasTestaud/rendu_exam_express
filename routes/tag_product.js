const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Tags } = require('../models/index.js');
const { Product } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');
const adminAuthorization = require('../middlewares/admin_authorization.js');

// Everything below this line is protected by the adminAuthorization middleware
router.use(authorization);
router.use(adminAuthorization);

router.post('/', function (req, res, next) {

  const productId = Number(req.body.productId);
  const tagId = Number(req.body.tagId);

  //Add tag to product
  Product.findByPk(productId).then(product => {

    Tags.findByPk(tagId).then(tag => {

      product.addTags(tag).then(() => {
        res.json('Tag added to product');
      })

    })
  })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

router.delete('/', function (req, res, next) {

  const productId = Number(req.body.productId);
  const tagId = Number(req.body.tagId);

  //Remove tag from product
  Product.findByPk(productId).then(product => {

    Tags.findByPk(tagId).then(tag => {

      product.removeTags(tag).then(() => {
        res.json('Tag removed from product');
      })

    })
  })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

module.exports = router;
