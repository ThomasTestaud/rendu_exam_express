const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Product, Tags } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');
const adminAuthorization = require('../middlewares/admin_authorization.js');



router.get('/', async function (req, res, next) {
  try {
    // Get and set params
    const amountPerPage = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 0;
    const tags = req.query.tags ? JSON.parse(req.query.tags) : [];

    // Count all products
    const totalProducts = await Product.count();

    // Define the base query
    const baseQuery = {
      attributes: ['title', 'price'],
      limit: amountPerPage,
      offset: page * amountPerPage,
      where: {
        stock: {
          [Op.gt]: 0
        },
      }
    };

    // Conditionally add the include clause
    if (tags.length > 0) {
      baseQuery.include = {
        model: Tags,
        attributes: ['name'],
        where: {
          name: {
            [Op.in]: tags,
          }
        }
      };
    } else {
      baseQuery.include = {
        model: Tags,
        attributes: ['name'],
      };
    }

    // Get all products
    const products = await Product.findAll(baseQuery);

    // Send all products and total products
    res.json({
      products: products,
      page: page,
      hasNextPage: amountPerPage * (page + 1) < totalProducts,
      hasPreviousPage: page > 0,
      totalProducts: totalProducts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', function (req, res, next) {

  Product.findByPk(req.params.id).then(product => {

    if (!product) {
      res.json('false');
    } else {
      res.json(product);
    }
  })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

// Everything below this line is protected by the adminAuthorization middleware
router.use(authorization);
router.use(adminAuthorization);


router.post('/', function (req, res, next) {

  const data = { title, price, description, stock } = req.body;

  Product.create(data)
    .then(() => {
      res.json('Product created');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

router.patch('/:id', function (req, res, next) {

  const data = { title, price, description, stock } = req.body;

  Product.update(data, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json('Product updated');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

router.delete('/:id', function (req, res, next) {

  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json('Product deleted');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});



module.exports = router;
