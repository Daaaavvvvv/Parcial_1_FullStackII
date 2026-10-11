import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuActivo, setMenuActivo] = useState(false);

  const toggleMenu = () => {
    setMenuActivo(!menuActivo);
  };

  // Función para cerrar el menú al hacer clic en un enlace
  const cerrarMenu = () => {
    setMenuActivo(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={cerrarMenu}>
        <img src="/img/logo.png" alt="Logo de Sonido Vivo" className="logo-img" />
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={menuActivo ? 'activo' : ''}>
        <ul>
          <li><Link to="/" onClick={cerrarMenu}>Home</Link></li>
          <li><Link to="/productos" onClick={cerrarMenu}>Productos</Link></li>
          <li><Link to="/sobre-nosotros" onClick={cerrarMenu}>Nosotros</Link></li>
          <li><Link to="/blogs" onClick={cerrarMenu}>Blogs</Link></li>
          <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
        </ul>
      </nav>

      <div className="acciones">
        <Link to="/login" onClick={cerrarMenu}>Iniciar sesión</Link> | <Link to="/registro" onClick={cerrarMenu}>Registrarse</Link>
        <Link to="/carrito" onClick={cerrarMenu}>🛒 Cart (<span id="cart-count">0</span>)</Link>
      </div>
    </header>
  );
}