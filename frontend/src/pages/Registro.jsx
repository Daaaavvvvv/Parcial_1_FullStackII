
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { agregarUsuario } from '../services/usuarioService.js';

export default function Registro() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    run: '',
    nombreCompleto: '',
    correo: '',
    direccion: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [error, setError] = useState('');

  const manejarCambio = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    setError('');

    if (datos.contrasena !== datos.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (datos.contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      agregarUsuario({
        run: datos.run.trim(),
        nombreCompleto: datos.nombreCompleto.trim(),
        correo: datos.correo.trim().toLowerCase(),
        direccion: datos.direccion.trim(),
        contrasena: datos.contrasena,
        rol: 'Cliente',
        activo: true
      });

      navigate('/login', {
        state: { mensaje: 'Cuenta creada correctamente. Inicia sesión.' }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container-contact">
      <section className="contact-section">
        <div className="contact-card">
          <div className="form-header">
            <h2>REGISTRARSE</h2>
          </div>

          <form className="contact-form" onSubmit={manejarRegistro}>
            <div className="form-group">
              <label htmlFor="run">RUN *</label>
              <input
                id="run"
                name="run"
                value={datos.run}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombreCompleto">NOMBRE COMPLETO *</label>
              <input
                id="nombreCompleto"
                name="nombreCompleto"
                value={datos.nombreCompleto}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo">CORREO *</label>
              <input
                id="correo"
                name="correo"
                type="email"
                value={datos.correo}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">DIRECCIÓN *</label>
              <input
                id="direccion"
                name="direccion"
                value={datos.direccion}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrasena">CONTRASEÑA *</label>
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                value={datos.contrasena}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarContrasena">
                CONFIRMAR CONTRASEÑA *
              </label>
              <input
                id="confirmarContrasena"
                name="confirmarContrasena"
                type="password"
                value={datos.confirmarContrasena}
                onChange={manejarCambio}
                required
              />
            </div>

            {error && <p role="alert" className="error-msg">{error}</p>}

            <button type="submit" className="btn-submit">
              CREAR CUENTA
            </button>

            <p>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
