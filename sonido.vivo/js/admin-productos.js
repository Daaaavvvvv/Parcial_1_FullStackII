function renderizarTablaAdmin() {
    const tbody = document.getElementById("tabla-productos-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    listaProductos.forEach((producto, index) => {
        const fila = document.createElement("tr");
            fila.innerHTML = `
        <td><img src="../${producto.imagen}" alt="${producto.nombre}" class="img-producto"></td>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString("es-CL")}</td>
        <td>${producto.stock}</td>
        <td>${producto.categoria}</td>
        <td>
            <a href="producto-editar.html?codigo=${producto.codigo}" class="btn-accion">Editar</a>
            <button class="btn-accion btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
    `;
        tbody.appendChild(fila);
    });
}

function eliminarProducto(index) {
    const producto = listaProductos[index];
    const confirmar = confirm(`¿Seguro que quieres eliminar "${producto.nombre}"?`);
    if (!confirmar) return;

    listaProductos.splice(index, 1);
    renderizarTablaAdmin();
}

document.addEventListener("DOMContentLoaded", renderizarTablaAdmin);