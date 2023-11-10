const express = require('express');
const router = express.Router();
const { Op, sequelize, fn } = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Order } = require('../models/index.js');
const auth = require('../middlewares/authorization.js');
const adminAuthorization = require('../middlewares/admin_authorization.js');



router.post('/register', function (req, res, next) {

  const data = { username, email, password } = req.body;

  User.create(data)
    .then(() => {
      res.redirect(307, '/user/login');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});


router.post('/login', function (req, res, next) {

  //identifier can be username or email, so the user can connect using both
  const identifier = req.body.identifier ? req.body.identifier : req.body.email;
  const password = req.body.password;

  //Get in the header if the users is on a computer or an inShop machine
  const inShop = req.headers.inShop === 'true';

  User.findOne(
    {
      where: {
        [Op.or]: [
          { email: identifier },
          { username: identifier }
        ]
      }
    }
  ).then(user => {

    if (!user) {
      res.json('false');
    } else {

      const secret = process.env.JWT_SECRET;

      bcrypt.compare(password, user.password).then(isOk => {
        if (!isOk) {
          res.json('false');
        } else {
          res.json({
            "token": JWT.sign({ id: user.id }, secret, { expiresIn: inShop ? '1h' : '30d' }),
          });
        }
      })
    }

  }).catch((error) => {
    res.status(500);
    res.json('error on login: ' + error);
  });
});


router.use(auth); //The next route are protected by the auth middleware

//Get own user info
router.get('/', function (req, res, next) {
  res.json(req.user);
});


router.patch('/', function (req, res, next) {

  const { username, email, password } = req.body;
  const data = { username, email, password };
  let userId = req.user.id;

  if (req.user.role === 'admin') { //Only admin can update other users
    userId = req.doby.id ? req.body.id : req.user.id;
    data.role = req.body.role ? req.body.role : req.user.role;
  }

  User.update(data, {
    where: {
      id: userId
    }
  }).then(() => {
    res.json('User updated');
  }).catch((error) => {
    res.status(500);
    res.json('error on updating user: ' + error);
  });

});

router.use(adminAuthorization); //The next route are protected by the adminAuthorization middleware

//Get all users as admin
router.get('/all', function (req, res, next) {

  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});

//Get user's details as admin
router.get('/:id', async function (req, res, next) {

  try {
    // Fetch the user details from id
    const user = await User.findAll({
      where: {
        id: req.params.id
      },
    });
  
    // Fetch the user total spent
    const total = await Order.sum('total', {
      where: {
        UserId: req.params.id
      },
    });
  
    // Respond with user details and total spent
    res.json({ user, total });
  } catch (error) {
    // Handle errors
    res.status(500).json(error);
  }
  
});




module.exports = router;
