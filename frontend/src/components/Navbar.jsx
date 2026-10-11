import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contarCarrito } from '../services/carritoService.js';

export default function Navbar() {
  const [menuActivo, setMenuActivo] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(contarCarrito);

  useEffect(() => {
    const actualizarContador = () => {
      setCantidadCarrito(contarCarrito());
    };

    window.addEventListener(
      'carritoActualizado',
      actualizarContador
    );

    return () => {
      window.removeEventListener(
        'carritoActualizado',
        actualizarContador
      );
    };
  }, []);

  const toggleMenu = () => {
    setMenuActivo((activo) => !activo);
  };

  const cerrarMenu = () => {
    setMenuActivo(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={cerrarMenu}>
        <img
          src="/img/logo.png"
          alt="Logo de Sonido Vivo"
          className="logo-img"
        />
      </Link>

      <button
        type="button"
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Abrir o cerrar menú"
        aria-expanded={menuActivo}
      >
        ☰
      </button>

      <nav className={menuActivo ? 'activo' : ''}>
        <ul>
          <li>
            <Link to="/" onClick={cerrarMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/productos" onClick={cerrarMenu}>
              Productos
            </Link>
          </li>

          <li>
            <Link to="/sobre-nosotros" onClick={cerrarMenu}>
              Nosotros
            </Link>
          </li>

          <li>
            <Link to="/blogs" onClick={cerrarMenu}>
              Blogs
            </Link>
          </li>

          <li>
            <Link to="/contacto" onClick={cerrarMenu}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      <div className="acciones">
        <Link to="/login" onClick={cerrarMenu}>
          Iniciar sesión
        </Link>
        {' | '}
        <Link to="/registro" onClick={cerrarMenu}>
          Registrarse
        </Link>
        {' | '}
        <Link to="/carrito" onClick={cerrarMenu}>
          🛒 Cart (
          <span id="cart-count">{cantidadCarrito}</span>
          )
        </Link>
      </div>
    </header>
  );
}
