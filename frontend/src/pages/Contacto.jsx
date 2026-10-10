
import { useState } from 'react';

export default function Contacto({ onEnviar = () => {} }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [confirmacion, setConfirmacion] = useState('');

  const validarFormulario = () => {
    const nuevosErrores = {};
    const correoValido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio';
    } else if (!correoValido.test(correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo válido';
    }

    if (!mensaje.trim()) {
      nuevosErrores.mensaje = 'El comentario es obligatorio';
    }

    return nuevosErrores;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setConfirmacion('');

    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const contacto = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      mensaje: mensaje.trim(),
      fecha: new Date().toISOString()
    };

    try {
      const contactosGuardados = JSON.parse(
        localStorage.getItem('contactos') || '[]'
      );

      contactosGuardados.push(contacto);

      localStorage.setItem(
        'contactos',
        JSON.stringify(contactosGuardados)
      );
    } catch {
      setConfirmacion(
        'No se pudo guardar el mensaje. Inténtalo nuevamente.'
      );
      return;
    }

    onEnviar({
      nombre: contacto.nombre,
      correo: contacto.correo,
      mensaje: contacto.mensaje
    });

    setNombre('');
    setCorreo('');
    setMensaje('');
    setErrores({});
    setConfirmacion('Mensaje guardado correctamente');
  };

  return (
    <main className="container-contact">
      <section className="contact-section">
        <div className="contact-header">
          <img
            src="/img/logo.png"
            alt="Logo Sonido Vivo"
            className="contact-logo"
          />
        </div>

        <div className="contact-card">
          <div className="form-header">
            <h2>FORMULARIO DE CONTACTO</h2>
          </div>

          <form
            id="contactForm"
            className="contact-form"
            noValidate
            onSubmit={manejarEnvio}
          >
            <div className="form-group">
              <label htmlFor="nombre">
                NOMBRE COMPLETO *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                maxLength={100}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <span className="error-msg" id="error-nombre">
                {errores.nombre}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="correo">
                CORREO *
              </label>
              <input
                type="text"
                id="correo"
                name="correo"
                maxLength={100}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <span className="error-msg" id="error-correo">
                {errores.correo}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">
                COMENTARIO *
              </label>
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
              <span className="error-msg" id="error-mensaje">
                {errores.mensaje}
              </span>
            </div>

            {confirmacion && (
              <p role="status">{confirmacion}</p>
            )}

            <button type="submit" className="btn-submit">
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
