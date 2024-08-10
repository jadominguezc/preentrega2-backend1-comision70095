const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const productsRouter = require('./routes/products');
const viewsRouter = require('./routes/views');
const socketIo = require('socket.io');
const http = require('http');
const fs = require('fs'); // Asegúrate de incluir esto
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const productsFilePath = path.join(__dirname, 'data/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('addProduct', (product) => {
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) throw err;
      const products = JSON.parse(data);
      product.id = products.length ? products[products.length - 1].id + 1 : 1;
      products.push(product);
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) throw err;
        io.emit('updateProducts', products);
      });
    });
  });

  socket.on('deleteProduct', (productId) => {
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) throw err;
      let products = JSON.parse(data);
      products = products.filter(product => product.id != productId);
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) throw err;
        io.emit('updateProducts', products);
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});
