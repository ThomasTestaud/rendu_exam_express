const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Product } = require('../models/index.js');


router.get('/seen', async function (req, res, next) {
  //get the most seen products from popularity order by seenAmount
  try {
    const mostSeenProducts = await Product.findAll({
      order: [
        ['seenAmount', 'DESC'],
      ],
      limit: 15,
      attributes: ['title', 'price'],
    });

    res.json(mostSeenProducts);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/bought', async function (req, res, next) {

  try {
    //get the most bought products from popularity order by boughtAmount
    const mostBoughtProducts = await Product.findAll({
      order: [
        ['boughtAmount', 'DESC'],
      ],
      limit: 15,
      attributes: ['title', 'price'],
    });
    
    res.json(mostBoughtProducts);

  } catch (error) {
    res.status(500).json(error);
  }

});

module.exports = router;
