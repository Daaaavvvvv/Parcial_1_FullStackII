import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuActivo, setMenuActivo] = useState(false);

  const toggleMenu = () => {
    setMenuActivo(!menuActivo);
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src="/img/logo.png" alt="Logo de Sonido Vivo" className="logo-img" />
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
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
        <Link to="/login">Iniciar sesión</Link> | <Link to="/registro">Registrarse</Link>
        <Link to="/carrito">🛒 Cart (<span id="cart-count">0</span>)</Link>
      </div>
    </header>
  );
}