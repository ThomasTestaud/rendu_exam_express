const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/index.js');
const auth = require('../middlewares/authorization.js');
const adminAuthorization = require('../middlewares/admin_authorization.js');



router.use(auth);
router.use(adminAuthorization);

router.post('/', function (req, res, next) {

  const { username, email, password } = req.body;
  const role = "admin";

  User.create({ username, email, password, role })
    .then(() => {
      res.json('Success on Admin creation');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

module.exports = router;
