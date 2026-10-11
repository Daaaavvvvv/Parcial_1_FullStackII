
import { usuariosIniciales, rolesUsuario } from '../data/usuarios.js';

const CLAVE = 'sonidoVivo_usuarios';

export function obtenerUsuarios() {
  const guardados = localStorage.getItem(CLAVE);
  return guardados ? JSON.parse(guardados) : [...usuariosIniciales];
}

export function buscarUsuario(run) {
  return obtenerUsuarios().find(u => u.run === run) || null;
}

function validarUsuario(usuario) {
  if (
    !usuario.run?.trim() ||
    !usuario.nombreCompleto?.trim() ||
    !usuario.correo?.trim() ||
    !usuario.direccion?.trim() ||
    !usuario.contrasena?.trim()
  ) {
    throw new Error('Todos los campos son obligatorios');
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correoValido.test(usuario.correo)) {
    throw new Error('Correo inválido');
  }

  if (!rolesUsuario.includes(usuario.rol)) {
    throw new Error('Rol inválido');
  }

  if (typeof usuario.activo !== 'boolean') {
    throw new Error('Estado de usuario inválido');
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE, JSON.stringify(usuarios));
}

export function agregarUsuario(usuario) {
  validarUsuario(usuario);

  const usuarios = obtenerUsuarios();

  if (usuarios.some(u => u.run === usuario.run)) {
    throw new Error('El RUN ya existe');
  }

  if (usuarios.some(
    u => u.correo.toLowerCase() === usuario.correo.toLowerCase()
  )) {
    throw new Error('El correo ya está registrado');
  }

  const nuevoUsuario = { ...usuario };
  guardarUsuarios([...usuarios, nuevoUsuario]);

  return nuevoUsuario;
}

export function editarUsuario(run, datos) {
  const usuarios = obtenerUsuarios();
  const indice = usuarios.findIndex(u => u.run === run);

  if (indice === -1) {
    throw new Error('Usuario no encontrado');
  }

  const actualizado = {
    ...usuarios[indice],
    ...datos,
    run
  };

  validarUsuario(actualizado);

  if (usuarios.some(
    (u, i) =>
      i !== indice &&
      u.correo.toLowerCase() === actualizado.correo.toLowerCase()
  )) {
    throw new Error('El correo ya está registrado');
  }

  const nuevosUsuarios = [...usuarios];
  nuevosUsuarios[indice] = actualizado;

  guardarUsuarios(nuevosUsuarios);
  return actualizado;
}

export function eliminarUsuario(run) {
  const usuarios = obtenerUsuarios();
  const filtrados = usuarios.filter(u => u.run !== run);

  if (filtrados.length === usuarios.length) {
    throw new Error('Usuario no encontrado');
  }

  guardarUsuarios(filtrados);
  return true;
}

export function cambiarEstadoUsuario(run, activo) {
  if (typeof activo !== 'boolean') {
    throw new Error('Estado de usuario inválido');
  }

  return editarUsuario(run, { activo });
}
