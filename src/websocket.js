const socketIo = require('socket.io');

module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('productCreated', (product) => {
            io.emit('updateProducts', product);
        });

        socket.on('productDeleted', (productId) => {
            io.emit('removeProduct', productId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};
