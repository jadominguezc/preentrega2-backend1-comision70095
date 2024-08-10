const socket = io();

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('productForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const product = {
            code: document.getElementById('code').value,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            stock: document.getElementById('stock').value,
            category: document.getElementById('category').value
        };


        if (Object.values(product).some(value => !value)) {
            alert('Debe completar todos los campos para poder crear un nuevo producto.');
            return;
        }

        socket.emit('addProduct', product);

        document.getElementById('productForm').reset();
    });

    socket.on('updateProducts', (products) => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <div><strong>TÍTULO:</strong> ${product.title}</div>
                <div><strong>Categoría:</strong> ${product.category}</div>
                <div><strong>Descripción:</strong> ${product.description}</div>
                <div><strong>Precio:</strong> $${product.price}</div>
                <div><strong>Stock:</strong> ${product.stock}</div>
                <button class="deleteBtn" data-code="${product.code}">ELIMINAR</button>
            `;
            productList.appendChild(productDiv);
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.addEventListener('click', () => {
                const code = button.getAttribute('data-code');
                socket.emit('deleteProduct', code);
            });
        });
    });
});
