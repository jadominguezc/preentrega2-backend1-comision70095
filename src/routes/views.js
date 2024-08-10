const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

router.get('/products', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading products data.');
    }
    const products = JSON.parse(data);
    res.render('index', { products });
  });
});

router.get('/realtimeproducts', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading products data.');
    }
    const products = JSON.parse(data);
    res.render('realTimeProducts', { products });
  });
});

module.exports = router;
