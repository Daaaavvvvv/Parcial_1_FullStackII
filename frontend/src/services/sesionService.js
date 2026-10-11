
import { obtenerUsuarios } from './usuarioService.js';

const CLAVE_SESION = 'sonidoVivo_sesion';

export function obtenerSesion() {
  try {
    const datos = sessionStorage.getItem(CLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
  } catch {
    return null;
  }
}

export function iniciarSesion(correo, contrasena) {
  const usuario = obtenerUsuarios().find(
    u =>
      u.correo.toLowerCase() === correo.trim().toLowerCase() &&
      u.contrasena === contrasena &&
      u.activo === true
  );

  if (!usuario) {
    throw new Error('Correo, contraseña o estado de cuenta incorrecto');
  }

  const sesion = {
    run: usuario.run,
    nombreCompleto: usuario.nombreCompleto,
    correo: usuario.correo,
    rol: usuario.rol
  };

  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  window.dispatchEvent(new Event('sesionActualizada'));

  return sesion;
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
  window.dispatchEvent(new Event('sesionActualizada'));
}
