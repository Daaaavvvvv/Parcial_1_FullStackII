function renderizarDetalleProducto() {
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");
    const producto = listaProductos.find(p => p.codigo === codigo);

    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    const relacionados = listaProductos.filter(
        p => p.categoria === producto.categoria && p.codigo !== producto.codigo
    );

    contenedor.innerHTML = `
        <nav class="breadcrumb">
            <a href="index.html">Home</a> &gt;
            <a href="productos.html">${producto.categoria}</a> &gt;
            <span>${producto.nombre}</span>
        </nav>

        <div class="detalle-grid">
            <div class="detalle-imagenes">
                <div class="detalle-imagen-principal">
                    <img src="${producto.imagen}" alt="${producto.nombre}" id="imagen-principal">
                </div>
                <div class="detalle-miniaturas">
                    <img src="${producto.imagen}" alt="Miniatura" class="miniatura activa">
                    <img src="${producto.imagen}" alt="Miniatura" class="miniatura">
                    <img src="${producto.imagen}" alt="Miniatura" class="miniatura">
                </div>
            </div>

            <div class="detalle-info">
                <div class="detalle-header">
                    <h1>${producto.nombre}</h1>
                    <span class="detalle-precio">$${producto.precio.toLocaleString("es-CL")}</span>
                </div>

                <hr>

                <p class="detalle-descripcion">
                    ${producto.descripcion || "Sin descripcion disponible."}
                </p>

                <hr>

                <div class="detalle-cantidad">
                    <label for="cantidad">Cantidad</label>
                    <select id="cantidad" ${producto.stock === 0 ? "disabled" : ""}>
                        ${Array.from({ length: Math.min(producto.stock, 10) }, (_, i) => i + 1)
                            .map(n => `<option value="${n}">${n}</option>`)
                            .join("")}
                    </select>
                </div>

                <button
                    class="btn-agregar"
                    onclick="agregarAlCarritoConCantidad('${producto.codigo}')"
                    ${producto.stock === 0 ? "disabled" : ""}
                >
                    ${producto.stock === 0 ? "Sin stock" : "Añadir al carrito"}
                </button>
            </div>
        </div>

        ${relacionados.length > 0 ? `
            <hr class="separador-relacionados">
            <div class="relacionados">
                <h3>Productos relacionados</h3>
                <div class="relacionados-grid">
                    ${relacionados.map(p => `
                        <a href="detalle-de-producto.html?codigo=${p.codigo}" class="relacionado-item">
                            <img src="${p.imagen}" alt="${p.nombre}">
                            <p>${p.nombre}</p>
                        </a>
                    `).join("")}
                </div>
            </div>
        ` : ""}
    `;
}

function agregarAlCarritoConCantidad(codigo) {
    const producto = listaProductos.find(p => p.codigo === codigo);
    const selectorCantidad = document.getElementById("cantidad");

    if (!producto || !selectorCantidad || producto.stock === 0) return;

    const cantidad = Number.parseInt(selectorCantidad.value, 10);
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const itemExistente = carrito.find(item => item.codigo === codigo);

    if (itemExistente) {
        itemExistente.cantidad = Math.min(itemExistente.cantidad + cantidad, producto.stock);
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarDetalleProducto();
    actualizarContadorCarrito();
});