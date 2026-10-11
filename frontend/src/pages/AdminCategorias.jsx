
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  agregarCategoria,
  consultarCategorias,
  editarCategoria,
  eliminarCategoria
} from '../services/categoriaService.js';

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState(
    consultarCategorias
  );
  const [nombre, setNombre] = useState('');
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const limpiarFormulario = () => {
    setNombre('');
    setEditando(null);
  };

  const manejarGuardar = (evento) => {
    evento.preventDefault();

    setError('');
    setMensaje('');

    try {
      if (editando) {
        editarCategoria(editando.id, nombre);
      } else {
        agregarCategoria(nombre);
      }

      setCategorias(consultarCategorias());

      setMensaje(
        editando
          ? 'Categoría actualizada correctamente.'
          : 'Categoría creada correctamente.'
      );

      limpiarFormulario();
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarEliminar = (categoria) => {
    if (
      !window.confirm(
        `¿Eliminar la categoría ${categoria.nombre}?`
      )
    ) {
      return;
    }

    setError('');
    setMensaje('');

    try {
      eliminarCategoria(categoria.id);
      setCategorias(consultarCategorias());
      setMensaje('Categoría eliminada correctamente.');

      if (editando?.id === categoria.id) {
        limpiarFormulario();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const iniciarEdicion = (categoria) => {
    setEditando(categoria);
    setNombre(categoria.nombre);
    setError('');
    setMensaje('');
  };

  return (
    <section>
      <div className="admin-header-tabla">
        <h1>Administración de categorías</h1>

        <Link
          className="btn-nuevo"
          to="/admin/productos"
        >
          Volver a productos
        </Link>
      </div>

      <p className="admin-descripcion">
        Crea, edita y elimina las categorías del catálogo.
      </p>

      {error && (
        <p role="alert" className="error-msg">
          {error}
        </p>
      )}

      {mensaje && (
        <p role="status">{mensaje}</p>
      )}

      <form
        className="admin-form"
        onSubmit={manejarGuardar}
      >
        <h2>
          {editando ? 'Editar categoría' : 'Nueva categoría'}
        </h2>

        <label htmlFor="nombre-categoria">
          Nombre *
        </label>

        <input
          id="nombre-categoria"
          value={nombre}
          onChange={(evento) =>
            setNombre(evento.target.value)
          }
          maxLength={80}
          required
        />

        <div className="admin-botones">
          <button type="submit">
            {editando
              ? 'Guardar cambios'
              : 'Crear categoría'}
          </button>

          {editando && (
            <button
              type="button"
              className="admin-btn-cancelar"
              onClick={limpiarFormulario}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2>Categorías registradas</h2>

      {categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        <div className="admin-tabla-contenedor">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.id}</td>

                  <td>
                    <div className="admin-acciones">
                      <button
                        type="button"
                        className="btn-accion"
                        onClick={() =>
                          iniciarEdicion(categoria)
                        }
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn-accion btn-eliminar"
                        onClick={() =>
                          manejarEliminar(categoria)
                        }
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
    </section>
  );
}
