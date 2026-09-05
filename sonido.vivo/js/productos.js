const listaProductos = [
  { codigo: "GT001", nombre: "Guitarra Acústica Yamaha", precio: 89990, stock: 12, categoria: "Guitarras", imagen: "img/gt001.jpg" },
  { codigo: "GT002", nombre: "Guitarra Eléctrica Fender", precio: 249990, stock: 5, categoria: "Guitarras", imagen: "img/gt002.jpg" },
  { codigo: "BT001", nombre: "Batería Electrónica Roland", precio: 399990, stock: 3, categoria: "Baterías y Percusión", imagen: "img/bt001.jpg" },
  { codigo: "TC001", nombre: "Teclado Casio 61 teclas", precio: 129990, stock: 8, categoria: "Teclados y Pianos", imagen: "img/tc001.jpg"},
  { codigo: "AM001", nombre: "Amplificador Marshall 20W", precio: 79990, stock: 10, categoria: "Amplificadores", imagen: "img/am001.jpg" }
];

function renderizarTablaProductos() {
  const tbody = document.getElementById("tabla-productos-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  listaProductos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto"></td>
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
  listaProductos.splice(index, 1);
  renderizarTablaProductos();
}

document.addEventListener("DOMContentLoaded", renderizarTablaProductos);