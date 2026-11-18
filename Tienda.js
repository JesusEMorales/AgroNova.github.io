let carrito = [];

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function toggleCarrito() {
    const modal = document.getElementById('carrito-modal');
    const mensaje = document.getElementById('mensaje-compra');
    modal.classList.toggle('abierto');
    if (modal.classList.contains('abierto') && carrito.length === 0) {
        mensaje.textContent = '';
        mensaje.className = 'mensaje-compra';
    }
}

function agregarAlCarrito(nombre, precio) {
    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedor = document.getElementById('carrito-items');
    const totalEl = document.getElementById('carrito-total');
    const contadorEl = document.getElementById('contador-carrito');
    const btnFinalizar = document.getElementById('btn-finalizar');

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#666;">Tu carrito está vacío.</p>';
        totalEl.textContent = 'Q0.00';
        contadorEl.textContent = '0';
        btnFinalizar.disabled = true;
        return;
    }

    let subtotal = 0;
    let totalProductos = 0;

    carrito.forEach((item, index) => {
        const totalProducto = item.precio * item.cantidad;
        subtotal += totalProducto;
        totalProductos += item.cantidad;

        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <div class="carrito-item-info">
                <strong>${item.nombre}</strong>
                <span class="carrito-item-detalle">${item.cantidad} x Q${item.precio.toFixed(2)} = <strong>Q${totalProducto.toFixed(2)}</strong></span>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">✖</button>
        `;
        contenedor.appendChild(div);
    });

    totalEl.textContent = `Q${subtotal.toFixed(2)}`;
    contadorEl.textContent = totalProductos;
    btnFinalizar.disabled = false;
}

function finalizarCompra() {
    const inputTarjeta = document.getElementById('numero-tarjeta');
    const mensaje = document.getElementById('mensaje-compra');

    if (carrito.length === 0) {
        return;
    }

    const tarjetaIngresada = inputTarjeta.value.trim();

    if (tarjetaIngresada !== '20266753') {
        mensaje.textContent = 'Error: Número de tarjeta inválido. Ingresa un número de tarjeta válido para completar la compra.';
        mensaje.className = 'mensaje-compra mensaje-error';
        return;
    }

    carrito = [];
    inputTarjeta.value = '';
    actualizarCarrito();

    mensaje.textContent = '¡Compra realizada con éxito! Gracias por comprar en AgroNova.';
    mensaje.className = 'mensaje-compra mensaje-exito';
}