const listaUsuarios = [
  { run: "19011022K", nombre: "David", apellidos: "Navarrete", correo: "davidxd@gmail.com", tipo: "Administrador", region: "Región Metropolitana de Santiago", comuna: "La Florida", direccion: "Volcán Tronador 21313" },
  { run: "180456782", nombre: "Isaac", apellidos: "Paredes", correo: "isaac@duoc.cl", tipo: "Vendedor", region: "Región de Valparaíso", comuna: "Viña del Mar", direccion: "Av. Libertad 450" },
  { run: "175893214", nombre: "Vanessa", apellidos: "Roberson", correo: "vane@gmail.com", tipo: "Cliente", region: "Región Metropolitana de Santiago", comuna: "Providencia", direccion: "Av. Providencia 1200" }
];

function renderizarTablaUsuarios() {
  const tbody = document.getElementById("tabla-usuarios-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  listaUsuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.run}</td>
      <td>${usuario.nombre} ${usuario.apellidos}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.tipo}</td>
      <td>${usuario.comuna}</td>
      <td>
        <a href="usuario-editar.html?run=${usuario.run}" class="btn-accion">Editar</a>
        <button class="btn-accion btn-eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function eliminarUsuario(index) {
  listaUsuarios.splice(index, 1);
  renderizarTablaUsuarios();
}

document.addEventListener("DOMContentLoaded", renderizarTablaUsuarios);