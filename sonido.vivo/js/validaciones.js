function mostrarModal(mensaje) {
  document.getElementById("modal-mensaje").textContent = mensaje;
  document.getElementById("modal-overlay").classList.add("activo");
}

function cerrarModal() {
  document.getElementById("modal-overlay").classList.remove("activo");
}
function validarRUN(run) {
  run = run.replace(/[.-]/g, "").toUpperCase();
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = resto.toString();

  return dv === dvEsperado;
}

function validarCorreo(correo) {
  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

function mostrarError(idSpan, mensaje) {
  const span = document.getElementById(idSpan);
  if (span) span.textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll(".error").forEach(span => span.textContent = "");
}

function validarFormularioRegistro(e) {
  e.preventDefault();
  limpiarErrores();

  let esValido = true;

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmar").value;
  const direccion = document.getElementById("direccion").value.trim();

  if (!run) {
    mostrarError("error-run", "El RUN es obligatorio.");
    esValido = false;
  } else if (!validarRUN(run)) {
    mostrarError("error-run", "RUN inválido. Ej: 19011022K, sin puntos ni guion.");
    esValido = false;
  }

  if (!nombre) {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError("error-nombre", "Máximo 50 caracteres.");
    esValido = false;
  }

  if (!apellidos) {
    mostrarError("error-apellidos", "Los apellidos son obligatorios.");
    esValido = false;
  } else if (apellidos.length > 100) {
    mostrarError("error-apellidos", "Máximo 100 caracteres.");
    esValido = false;
  }

  if (!correo) {
    mostrarError("error-correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("error-correo", "Máximo 100 caracteres.");
    esValido = false;
  } else if (!validarCorreo(correo)) {
    mostrarError("error-correo", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  }

  if (!password) {
    mostrarError("error-password", "La contraseña es obligatoria.");
    esValido = false;
  } else if (password.length < 4 || password.length > 10) {
    mostrarError("error-password", "Debe tener entre 4 y 10 caracteres.");
    esValido = false;
  }

  if (confirmar !== password) {
    mostrarError("error-confirmar", "Las contraseñas no coinciden.");
    esValido = false;
  }

  if (!direccion) {
    mostrarError("error-direccion", "La dirección es obligatoria.");
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError("error-direccion", "Máximo 300 caracteres.");
    esValido = false;
  }

  if (esValido) {
    mostrarModal("Se ha registrado correctamente. ¡Bienvenido!");
    // más adelante: guardar en localStorage o enviar al backend
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");
  if (form) form.addEventListener("submit", validarFormularioRegistro);
});


function validarFormularioLogin(e) {
  e.preventDefault();
  limpiarErrores();

  let esValido = true;

  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;

  if (!correo) {
    mostrarError("error-correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("error-correo", "Máximo 100 caracteres.");
    esValido = false;
  } else if (!validarCorreo(correo)) {
    mostrarError("error-correo", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  }

  if (!password) {
    mostrarError("error-password", "La contraseña es obligatoria.");
    esValido = false;
  } else if (password.length < 4 || password.length > 10) {
    mostrarError("error-password", "Debe tener entre 4 y 10 caracteres.");
    esValido = false;
  }

  if (esValido) {
    mostrarModal("Inicio de sesión válido.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  if (formLogin) formLogin.addEventListener("submit", validarFormularioLogin);
});


function validarFormularioProducto(e) {
  e.preventDefault();
  limpiarErrores();

  let esValido = true;

  const codigo = document.getElementById("codigo").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const stockCritico = document.getElementById("stock-critico").value;
  const categoria = document.getElementById("categoria").value;

  if (!codigo) {
    mostrarError("error-codigo", "El código es obligatorio.");
    esValido = false;
  } else if (codigo.length < 3) {
    mostrarError("error-codigo", "Mínimo 3 caracteres.");
    esValido = false;
  }

  if (!nombre) {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 100) {
    mostrarError("error-nombre", "Máximo 100 caracteres.");
    esValido = false;
  }

  if (descripcion.length > 500) {
    mostrarError("error-descripcion", "Máximo 500 caracteres.");
    esValido = false;
  }

  if (precio === "") {
    mostrarError("error-precio", "El precio es obligatorio.");
    esValido = false;
  } else if (parseFloat(precio) < 0) {
    mostrarError("error-precio", "El precio no puede ser negativo.");
    esValido = false;
  }

  if (stock === "") {
    mostrarError("error-stock", "El stock es obligatorio.");
    esValido = false;
  } else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
    mostrarError("error-stock", "Debe ser un número entero, mínimo 0.");
    esValido = false;
  }

  if (stockCritico !== "" && (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)) {
    mostrarError("error-stock-critico", "Debe ser un número entero, mínimo 0.");
    esValido = false;
  }

  if (!categoria) {
    mostrarError("error-categoria", "Debe seleccionar una categoría.");
    esValido = false;
  }

  if (esValido) {
    listaProductos.push({
      codigo, nombre, marca: "-",
      precio: parseFloat(precio),
      stock: parseInt(stock),
      categoria
    });
    mostrarModal("Producto guardado correctamente.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formProducto = document.getElementById("form-producto");
  if (formProducto) formProducto.addEventListener("submit", validarFormularioProducto);
});


function cargarProductoParaEditar() {
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");
  if (!codigo) return;

  const producto = listaProductos.find(p => p.codigo === codigo);
  if (!producto) return;

  document.getElementById("codigo").value = producto.codigo;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
  document.getElementById("categoria").value = producto.categoria;
}

function validarFormularioProductoEditar(e) {
  e.preventDefault();
  limpiarErrores();

  let esValido = true;

  const codigo = document.getElementById("codigo").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const stockCritico = document.getElementById("stock-critico").value;
  const categoria = document.getElementById("categoria").value;

  if (!nombre) {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 100) {
    mostrarError("error-nombre", "Máximo 100 caracteres.");
    esValido = false;
  }

  if (descripcion.length > 500) {
    mostrarError("error-descripcion", "Máximo 500 caracteres.");
    esValido = false;
  }

  if (precio === "") {
    mostrarError("error-precio", "El precio es obligatorio.");
    esValido = false;
  } else if (parseFloat(precio) < 0) {
    mostrarError("error-precio", "El precio no puede ser negativo.");
    esValido = false;
  }

  if (stock === "") {
    mostrarError("error-stock", "El stock es obligatorio.");
    esValido = false;
  } else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
    mostrarError("error-stock", "Debe ser un número entero, mínimo 0.");
    esValido = false;
  }

  if (stockCritico !== "" && (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)) {
    mostrarError("error-stock-critico", "Debe ser un número entero, mínimo 0.");
    esValido = false;
  }

  if (!categoria) {
    mostrarError("error-categoria", "Debe seleccionar una categoría.");
    esValido = false;
  }

  if (esValido) {
    const producto = listaProductos.find(p => p.codigo === codigo);
    if (producto) {
      producto.nombre = nombre;
      producto.precio = parseFloat(precio);
      producto.stock = parseInt(stock);
      producto.categoria = categoria;
    }
    mostrarModal("Producto actualizado correctamente.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductoParaEditar();
  const formProductoEditar = document.getElementById("form-producto-editar");
  if (formProductoEditar) formProductoEditar.addEventListener("submit", validarFormularioProductoEditar);
});

function validarFormularioUsuario(e) {
  e.preventDefault();
  limpiarErrores();

  let esValido = true;

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipoUsuario = document.getElementById("tipo-usuario").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();

  if (!run) {
    mostrarError("error-run", "El RUN es obligatorio.");
    esValido = false;
  } else if (!validarRUN(run)) {
    mostrarError("error-run", "RUN inválido. Ej: 19011022K, sin puntos ni guion.");
    esValido = false;
  }

  if (!nombre) {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError("error-nombre", "Máximo 50 caracteres.");
    esValido = false;
  }

  if (!apellidos) {
    mostrarError("error-apellidos", "Los apellidos son obligatorios.");
    esValido = false;
  } else if (apellidos.length > 100) {
    mostrarError("error-apellidos", "Máximo 100 caracteres.");
    esValido = false;
  }

  if (!correo) {
    mostrarError("error-correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("error-correo", "Máximo 100 caracteres.");
    esValido = false;
  } else if (!validarCorreo(correo)) {
    mostrarError("error-correo", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  }

  if (!tipoUsuario) {
    mostrarError("error-tipo-usuario", "Debe seleccionar un tipo de usuario.");
    esValido = false;
  }

  if (!direccion) {
    mostrarError("error-direccion", "La dirección es obligatoria.");
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError("error-direccion", "Máximo 300 caracteres.");
    esValido = false;
  }

  if (esValido) {
    listaUsuarios.push({
      run, nombre, apellidos, correo, tipo: tipoUsuario, region, comuna, direccion
    });
    mostrarModal("Usuario guardado correctamente.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formUsuario = document.getElementById("form-usuario");
  if (formUsuario) formUsuario.addEventListener("submit", validarFormularioUsuario);
});


function cargarUsuarioParaEditar() {
  cargarRegiones();
  const params = new URLSearchParams(window.location.search);
  const run = params.get("run");
  if (!run) return;

  const usuario = listaUsuarios.find(u => u.run === run);
  if (!usuario) return;

  document.getElementById("run").value = usuario.run;
  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("apellidos").value = usuario.apellidos;
  document.getElementById("correo").value = usuario.correo;
  document.getElementById("tipo-usuario").value = usuario.tipo;
  document.getElementById("direccion").value = usuario.direccion;

  const selectRegion = document.getElementById("region");
  selectRegion.value = usuario.region;
  cargarComunas();
  document.getElementById("comuna").value = usuario.comuna;
}

function validarFormularioUsuarioEditar(e) {
  e.preventDefault();
  limpiarErrores();

  let esValido = true;

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipoUsuario = document.getElementById("tipo-usuario").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();

  if (!nombre) {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError("error-nombre", "Máximo 50 caracteres.");
    esValido = false;
  }

  if (!apellidos) {
    mostrarError("error-apellidos", "Los apellidos son obligatorios.");
    esValido = false;
  } else if (apellidos.length > 100) {
    mostrarError("error-apellidos", "Máximo 100 caracteres.");
    esValido = false;
  }

  if (!correo) {
    mostrarError("error-correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("error-correo", "Máximo 100 caracteres.");
    esValido = false;
  } else if (!validarCorreo(correo)) {
    mostrarError("error-correo", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  }

  if (!tipoUsuario) {
    mostrarError("error-tipo-usuario", "Debe seleccionar un tipo de usuario.");
    esValido = false;
  }

  if (!direccion) {
    mostrarError("error-direccion", "La dirección es obligatoria.");
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError("error-direccion", "Máximo 300 caracteres.");
    esValido = false;
  }

  if (esValido) {
    const usuario = listaUsuarios.find(u => u.run === run);
    if (usuario) {
      usuario.nombre = nombre;
      usuario.apellidos = apellidos;
      usuario.correo = correo;
      usuario.tipo = tipoUsuario;
      usuario.region = region;
      usuario.comuna = comuna;
      usuario.direccion = direccion;
    }
    mostrarModal("Usuario actualizado correctamente.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarioParaEditar();
  const formUsuarioEditar = document.getElementById("form-usuario-editar");
  if (formUsuarioEditar) formUsuarioEditar.addEventListener("submit", validarFormularioUsuarioEditar);
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const contadorElemento = document.getElementById('contador');
  const textareaMensaje = document.getElementById('mensaje');

  // ==========================================
  // LIMPIEZA AL CARGAR / RECARGAR (F5)
  // ==========================================
  if (form) {
    form.reset();
  }
  if (contadorElemento) {
    contadorElemento.textContent = '0';
  }

  // Forzar limpieza justo en el instante que el usuario presiona F5 o refresca
  window.addEventListener('beforeunload', function() {
    if (form) {
      form.reset();
    }
  });

  // Contador de caracteres
  if (textareaMensaje && contadorElemento) {
    textareaMensaje.addEventListener('input', function() {
      const caracteresUsados = this.value.length;
      contadorElemento.textContent = caracteresUsados;
      
      if (caracteresUsados >= 500) {
        contadorElemento.style.color = 'red';
      } else {
        contadorElemento.style.color = '#666666';
      }
    });
  }

  // Validación del Formulario
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Detiene el envío por defecto

      // Limpiar errores anteriores
      limpiarErrores();

      let hayError = false;

      // Captura de valores
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // 1. Validar Nombre
      if (nombre === '') {
        mostrarError('nombre', 'El nombre es obligatorio.');
        hayError = true;
      } else if (nombre.length > 100) {
        mostrarError('nombre', 'El nombre no puede superar los 100 caracteres.');
        hayError = true;
      }

      // 2. Validar Correo
      if (correo.length > 100) {
        mostrarError('correo', 'El correo no puede superar los 100 caracteres.');
        hayError = true;
      } else if (correo === '') {
        mostrarError('correo', 'El correo es obligatorio.');
        hayError = true; 
      } else if (correo !== '') {
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const esValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
        if (!esValido) {
          mostrarError('correo', 'Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
          hayError = true;
        }
      }

      // 3. Validar Comentario
      if (mensaje === '') {
        mostrarError('mensaje', 'El comentario es obligatorio.');
        hayError = true;
      } else if (mensaje.length > 500) {
        mostrarError('mensaje', 'El comentario no puede superar los 500 caracteres.');
        hayError = true;
      }

      // Si todo está correcto
      if (!hayError) {
        alert('¡Formulario enviado con éxito!');
        form.reset();
        if (contadorElemento) {
          contadorElemento.textContent = '0';
        }
      }
    });
  }

  // Funciones auxiliares para mostrar/limpiar errores
  function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById(`error-${campoId}`);
    
    if (input && errorSpan) {
      input.classList.add('input-error');
      errorSpan.textContent = mensaje;
    }
  }

  function limpiarErrores() {
    const errores = document.querySelectorAll('.error-msg');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errores.forEach(span => span.textContent = '');
    inputs.forEach(input => input.classList.remove('input-error'));
  }
});