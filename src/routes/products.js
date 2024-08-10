const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading products data.');
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

router.post('/', (req, res) => {
    const newProduct = req.body;
  
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading products data.');
      }
      const products = JSON.parse(data);
      newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
      products.push(newProduct);
  
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error saving product.');
        }
        res.status(201).json(newProduct);
      });
    });
  });

module.exports = router;
