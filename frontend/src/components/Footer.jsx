import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Columna Izquierda: Identidad y Métodos de Pago */}
        <div className="footer-brand">
          <span className="site-name">Sonido Vivo</span>
          <small className="copyright">Viña del Mar © 2026</small>
          <div className="payment-methods">
            <img src="/img/visa.png" alt="Visa" />
            <img src="/img/mastercard.jpg" alt="MasterCard" className="img-mastercard" />
            <img src="/img/amex.png" alt="American Express" className="img-amex" />
          </div>
        </div>

        {/* Columna Central: Categorías */}
        <div className="footer-categories">
          <Link to="/productos">Instrumentos</Link> | 
          <Link to="/productos">Amplificadores</Link> | 
          <Link to="/productos">Accesorios</Link>
        </div>

        {/* Columna Derecha: Newsletter */}
        <div className="footer-newsletter">
          <p>¡Mantente al día! Suscríbete al boletín:</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Tu correo aquí" required />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </div>
    </footer>
  );
}