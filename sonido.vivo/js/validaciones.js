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