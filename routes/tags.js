const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Tags } = require('../models/index.js');
const authorization = require('../middlewares/authorization.js');
const adminAuthorization = require('../middlewares/admin_authorization.js');

// Everything below this line is protected by the adminAuthorization middleware
router.use(authorization);
router.use(adminAuthorization);

router.get('/', function (req, res, next) {

  Tags.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

router.post('/', function (req, res, next) {

  const { name } = req.body;
  const data = { name };

  Tags.create(data)
    .then(() => {
      res.json('Tag created');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

router.patch('/:id', function (req, res, next) {

  const { name } = req.body;
  const data = { name };

  Tags.update(data, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json('Tag updated');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

router.delete('/:id', function (req, res, next) {

  Tags.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json('Tag deleted');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});



module.exports = router;
