const listaProductos = [
  { codigo: "GT001", nombre: "Guitarra Acústica Yamaha", precio: 89990, stock: 12, categoria: "Guitarras", imagen: "img/gt001.jpg", descripcion: "Guitarra acústica ideal para principiantes y estudiantes, con un sonido cálido y cuerpo cómodo para largas sesiones de práctica." },
  { codigo: "GT002", nombre: "Guitarra Eléctrica Fender", precio: 249990, stock: 5, categoria: "Guitarras", imagen: "img/gt002.jpg", descripcion: "Guitarra eléctrica de cuerpo sólido, perfecta para rock y blues, con pastillas de alta fidelidad." },
  { codigo: "BT001", nombre: "Batería Electrónica Roland", precio: 399990, stock: 3, categoria: "Baterías y Percusión", imagen: "img/bt001.jpg", descripcion: "Batería electrónica compacta con múltiples sonidos preconfigurados, ideal para práctica silenciosa." },
  { codigo: "TC001", nombre: "Teclado Casio 61 teclas", precio: 129990, stock: 8, categoria: "Teclados y Pianos", imagen: "img/tc001.jpg", descripcion: "Teclado de 61 teclas con múltiples voces y ritmos, perfecto para aprender y componer." },
  { codigo: "AM001", nombre: "Amplificador Marshall 20W", precio: 79990, stock: 10, categoria: "Amplificadores", imagen: "img/am001.jpg", descripcion: "Amplificador compacto de 20W, ideal para práctica en casa con un sonido característico Marshall." }
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
      <td>
        <a href="detalle-de-producto.html?codigo=${encodeURIComponent(producto.codigo)}">
          ${producto.nombre}
        </a>
      </td>
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