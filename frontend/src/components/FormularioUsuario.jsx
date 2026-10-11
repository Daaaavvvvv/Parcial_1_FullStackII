
import { useState } from 'react';
import { rolesUsuario } from '../data/usuarios.js';

export default function FormularioUsuario({
  usuarioInicial = {},
  onGuardar,
  onCancelar,
  esEdicion = false,
  error = ''
}) {
  const [datos, setDatos] = useState({
    run: usuarioInicial.run || '',
    nombreCompleto: usuarioInicial.nombreCompleto || '',
    correo: usuarioInicial.correo || '',
    direccion: usuarioInicial.direccion || '',
    contrasena: '',
    rol: usuarioInicial.rol || 'Cliente',
    activo: usuarioInicial.activo ?? true
  });

  const [errorLocal, setErrorLocal] = useState('');

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;

    setDatos({
      ...datos,
      [name]: type === 'checkbox' ? checked : value
    });

    setErrorLocal('');
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorLocal('');

    if (
      !datos.run.trim() ||
      !datos.nombreCompleto.trim() ||
      !datos.correo.trim() ||
      !datos.direccion.trim()
    ) {
      setErrorLocal('Todos los campos son obligatorios');
      return;
    }

    if (!esEdicion && !datos.contrasena.trim()) {
      setErrorLocal('La contraseña es obligatoria');
      return;
    }

    if (datos.contrasena && datos.contrasena.length < 8) {
      setErrorLocal('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    const usuario = {
      run: datos.run.trim(),
      nombreCompleto: datos.nombreCompleto.trim(),
      correo: datos.correo.trim().toLowerCase(),
      direccion: datos.direccion.trim(),
      rol: datos.rol,
      activo: datos.activo
    };

    if (datos.contrasena) {
      usuario.contrasena = datos.contrasena;
    }

    onGuardar(usuario);
  };

  return (
    <form className="admin-form" onSubmit={manejarEnvio} noValidate>
      <label htmlFor="run">RUN *</label>
      <input
        id="run"
        name="run"
        placeholder="12345678-9"
        value={datos.run}
        onChange={manejarCambio}
        readOnly={esEdicion}
        maxLength={15}
      />

      <label htmlFor="nombreCompleto">Nombre completo *</label>
      <input
        id="nombreCompleto"
        name="nombreCompleto"
        value={datos.nombreCompleto}
        onChange={manejarCambio}
        maxLength={100}
      />

      <label htmlFor="correo">Correo electrónico *</label>
      <input
        id="correo"
        name="correo"
        type="email"
        value={datos.correo}
        onChange={manejarCambio}
        maxLength={100}
      />

      <label htmlFor="direccion">Dirección *</label>
      <input
        id="direccion"
        name="direccion"
        value={datos.direccion}
        onChange={manejarCambio}
        maxLength={200}
      />

      <label htmlFor="contrasena">
        {esEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña *'}
      </label>
      <input
        id="contrasena"
        name="contrasena"
        type="password"
        value={datos.contrasena}
        onChange={manejarCambio}
        autoComplete="new-password"
      />

      <label htmlFor="rol">Tipo de usuario *</label>
      <select
        id="rol"
        name="rol"
        value={datos.rol}
        onChange={manejarCambio}
      >
        {rolesUsuario.map((rol) => (
          <option key={rol} value={rol}>
            {rol}
          </option>
        ))}
      </select>

      <label className="admin-checkbox" htmlFor="activo">
        <input
          id="activo"
          name="activo"
          type="checkbox"
          checked={datos.activo}
          onChange={manejarCambio}
        />
        Usuario activo
      </label>

      {(errorLocal || error) && (
        <p className="error-msg" role="alert">
          {errorLocal || error}
        </p>
      )}

      <div className="admin-botones">
        <button type="submit">
          {esEdicion ? 'Guardar cambios' : 'Guardar usuario'}
        </button>

        <button
          type="button"
          className="admin-btn-cancelar"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
