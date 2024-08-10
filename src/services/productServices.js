const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const getProducts = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(productsFilePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                const products = JSON.parse(data);
                resolve(products);
            } catch (err) {
                reject(err);
            }
        });
    });
};

const saveProducts = (products) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};


module.exports = {
    getProducts,
    saveProducts
};
