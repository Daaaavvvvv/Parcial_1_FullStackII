
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  obtenerSesion,
  cerrarSesion
} from '../services/sesionService.js';

export default function Navbar() {
  const [menuActivo, setMenuActivo] = useState(false);
  const [sesion, setSesion] = useState(obtenerSesion);
  const navigate = useNavigate();

  useEffect(() => {
    const actualizarSesion = () => {
      setSesion(obtenerSesion());
    };

    window.addEventListener('sesionActualizada', actualizarSesion);
    window.addEventListener('storage', actualizarSesion);

    return () => {
      window.removeEventListener('sesionActualizada', actualizarSesion);
      window.removeEventListener('storage', actualizarSesion);
    };
  }, []);

  const manejarCierre = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img
          src="/img/logo.png"
          alt="Logo de Sonido Vivo"
          className="logo-img"
        />
      </Link>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuActivo(!menuActivo)}
        aria-label="Abrir o cerrar menú"
      >
        ☰
      </button>

      <nav className={menuActivo ? 'activo' : ''}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/sobre-nosotros">Nosotros</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>

      <div className="acciones">
        {sesion ? (
          <>
            <span>Hola, {sesion.nombreCompleto}</span>
            {' | '}
            <button type="button" onClick={manejarCierre}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            {' | '}
            <Link to="/registro">Registrarse</Link>
          </>
        )}

        {' '}
        <Link to="/carrito">
          🛒 Cart (<span id="cart-count">0</span>)
        </Link>
      </div>
    </header>
  );
}
