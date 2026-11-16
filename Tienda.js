let carrito = [];

function agregarAlCarrito(nombre, precio) {
    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarritoUI();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const contenedor = document.getElementById('carrito-items');
    const contador = document.getElementById('contador-carrito');
    const totalEl = document.getElementById('carrito-total');

    let totalItems = 0;
    let totalPrecio = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#666;">Tu carrito está vacío.</p>';
    } else {
        contenedor.innerHTML = '';
        carrito.forEach((item, index) => {
            totalItems += item.cantidad;
            totalPrecio += item.precio * item.cantidad;
            contenedor.innerHTML += `
                <div class="carrito-item">
                    <div>
                        <strong>${item.nombre}</strong><br>
                        <small>Q${item.precio.toLocaleString('es-GT', {minimumFractionDigits: 2})} x ${item.cantidad}</small>
                    </div>
                    <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">🗑️</button>
                </div>
            `;
        });
    }

    contador.textContent = totalItems;
    totalEl.textContent = 'Q' + totalPrecio.toLocaleString('es-GT', { minimumFractionDigits: 2 });
}

function toggleCarrito() {
    document.getElementById('carrito-modal').classList.toggle('abierto');
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Agrega al menos un producto al carrito antes de confirmar tu pedido.');
        return;
    }
    alert('¡Gracias por tu compra en AgroNova! Nuestro equipo técnico se pondrá en contacto contigo para coordinar la entrega y asesoría.');
    carrito = [];
    actualizarCarritoUI();
    toggleCarrito();
}

function filtrarProductos() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.producto-card');

    tarjetas.forEach(card => {
        const nombre = card.querySelector('.nombre-producto').textContent.toLowerCase();
        const marca = card.querySelector('.marca-texto').textContent.toLowerCase();

        if (nombre.includes(texto) || marca.includes(texto)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

document.getElementById('buscador').addEventListener('keyup', filtrarProductos);