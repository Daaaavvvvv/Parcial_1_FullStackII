function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const tbody = document.getElementById("carrito-body");
    const totalEl = document.getElementById("carrito-total");
    if (!tbody) return;

    tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${item.imagen}" alt="${item.nombre}" class="img-producto"></td>
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString("es-CL")}</td>
            <td>
                <div class="control-cantidad">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
            </td>
            <td>$${subtotal.toLocaleString("es-CL")}</td>
            <td>
                <button class="btn-accion btn-eliminar" onclick="quitarDelCarrito(${index})">Quitar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    if (carrito.length > 0) {
        totalEl.textContent = `Total: $${total.toLocaleString("es-CL")}`;
        totalEl.classList.remove("vacio");
    } else {
        totalEl.textContent = "Tu carrito está vacío";
        totalEl.classList.add("vacio");
    }
}

function cambiarCantidad(index, delta) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = carrito[index];
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

function quitarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);