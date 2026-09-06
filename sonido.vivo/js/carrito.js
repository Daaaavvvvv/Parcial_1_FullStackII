function RenderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const tbody = document.getElementById("carrito-body");
    const totalElements = document.getElementById("carrito-total");
    if (!tbody) return;

    tbody.innerHTML = "";
    let total = 0

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td><img src="${item.imagen}" alt="${item.nombre}" class="img-producto"></td>
        <td>${item.nombre}</td>
        <td>$${item.precio.toLocaleString("es-CL")}</td>
        <td>${item.cantidad}</td>
        <td>$${subtotal.toLocaleString("es-CL")}</td>
        <td>
            <button class="btn-accion btn-eliminar" onclick="quitarDelCarrito(${index})">Quitar</button>
        </td>
        `;
        tbody.appendChild(fila);
    });

    totalEl.textContent = carrito.length > 0
        ? `Total: $${total.toLocaleString("es-CL")}`
        : "Tu carrito está vacío.";
}

function quitarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);