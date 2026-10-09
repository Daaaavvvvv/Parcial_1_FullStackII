import React, { useState } from 'react';

export default function Contacto() {
    
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  return (
    <main className="container-contact">
      <section className="contact-section">

        {/* Logo de la empresa */}
        <div className="contact-header">
          <img
            src="/img/logo.png"
            alt="Logo Sonido Vivo"
            className="contact-logo"
          />
        </div>

        {/* Tarjeta del formulario */}
        <div className="contact-card">
          <div className="form-header">
            <h2>FORMULARIO DE CONTACTO</h2>
          </div>

          <form id="contactForm" className="contact-form" noValidate>

            {/* Nombre completo */}
            <div className="form-group">
              <label htmlFor="nombre">NOMBRE COMPLETO *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                maxLength={100}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <span className="error-msg" id="error-nombre"></span>
            </div>

            {/* Correo */}
            <div className="form-group">
              <label htmlFor="correo">CORREO *</label>
              <input
                type="text"
                id="correo"
                name="correo"
                maxLength={100}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <span className="error-msg" id="error-correo"></span>
            </div>

            {/* Mensaje */}
            <div className="form-group">
              <label htmlFor="mensaje">COMENTARIO *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                maxLength={500}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            <small className="char-counter">
            {mensaje.length} / 500 caracteres
            </small>
              <span className="error-msg" id="error-mensaje"></span>
            </div>

            <button type="submit" className="btn-submit">
              ENVIAR MENSAJE
            </button>

          </form>
        </div>
      </section>
    </main>
  );
}
