
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/sesionService.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const manejarLogin = (e) => {
    e.preventDefault();
    setError('');

    try {
      iniciarSesion(correo, contrasena);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container-contact">
      <section className="contact-section">
        <div className="contact-card">
          <div className="form-header">
            <h2>INICIAR SESIÓN</h2>
          </div>

          <form className="contact-form" onSubmit={manejarLogin}>
            {location.state?.mensaje && (
              <p role="status">{location.state.mensaje}</p>
            )}

            <div className="form-group">
              <label htmlFor="correo">CORREO *</label>
              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contrasena">CONTRASEÑA *</label>
              <input
                id="contrasena"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            {error && <p role="alert" className="error-msg">{error}</p>}

            <button type="submit" className="btn-submit">
              INICIAR SESIÓN
            </button>

            <p>
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
