
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obtenerUsuarios,
  eliminarUsuario,
  cambiarEstadoUsuario
} from '../services/usuarioService.js';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios);
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState('');

  const actualizarLista = () => {
    setUsuarios(obtenerUsuarios());
  };

  const manejarEliminar = (usuario) => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar a ${usuario.nombreCompleto}?`
    );

    if (!confirmar) return;

    try {
      eliminarUsuario(usuario.run);
      setSeleccionado(null);
      setError('');
      actualizarLista();
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarEstado = (usuario) => {
    try {
      cambiarEstadoUsuario(usuario.run, !usuario.activo);
      actualizarLista();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const usuarioSeleccionado = usuarios.find(
    (usuario) => usuario.run === seleccionado
  );

  return (
    <>
      <div className="admin-header-tabla">
        <h1>Administración de Usuarios</h1>

        <Link to="/admin/usuarios/nuevo" className="btn-nuevo">
          + Nuevo Usuario
        </Link>
      </div>

      <p className="admin-descripcion">
        Consulta y administra los usuarios registrados en Sonido Vivo.
      </p>

      {error && (
        <p role="alert" className="error-msg">
          {error}
        </p>
      )}

      {usuarios.length === 0 ? (
        <div className="admin-panel">
          <p>No hay usuarios registrados.</p>
        </div>
      ) : (
        <div className="admin-tabla-contenedor">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.run}>
                  <td>{usuario.run}</td>
                  <td>{usuario.nombreCompleto}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol}</td>

                  <td>
                    <span className={
                      usuario.activo
                        ? 'admin-estado activo'
                        : 'admin-estado inactivo'
                    }>
                      {usuario.activo ? 'Activo' : 'Desactivado'}
                    </span>
                  </td>

                  <td>
                    <div className="admin-acciones">
                      <button
                        type="button"
                        className="btn-accion"
                        onClick={() => setSeleccionado(usuario.run)}
                      >
                        Ver
                      </button>

                      <Link
                        className="btn-accion"
                        to={`/admin/usuarios/${encodeURIComponent(usuario.run)}/editar`}
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        className="btn-accion"
                        onClick={() => manejarEstado(usuario)}
                      >
                        {usuario.activo ? 'Desactivar' : 'Activar'}
                      </button>

                      <button
                        type="button"
                        className="btn-accion btn-eliminar"
                        onClick={() => manejarEliminar(usuario)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {usuarioSeleccionado && (
        <section className="admin-panel" aria-label="Detalle del usuario">
          <div className="admin-header-tabla">
            <h2>Perfil del usuario</h2>

            <button
              type="button"
              className="admin-btn-cerrar"
              onClick={() => setSeleccionado(null)}
            >
              Cerrar
            </button>
          </div>

          <div className="admin-detalle">
            <p><strong>RUN:</strong> {usuarioSeleccionado.run}</p>
            <p><strong>Nombre:</strong> {usuarioSeleccionado.nombreCompleto}</p>
            <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
            <p><strong>Dirección:</strong> {usuarioSeleccionado.direccion}</p>
            <p><strong>Rol:</strong> {usuarioSeleccionado.rol}</p>
            <p>
              <strong>Estado:</strong>{' '}
              {usuarioSeleccionado.activo ? 'Activo' : 'Desactivado'}
            </p>
          </div>

          <h3>Historial de compras</h3>

          <p className="admin-descripcion">
            No hay un historial de compras disponible para este usuario.
          </p>
        </section>
      )}
    </>
  );
}
