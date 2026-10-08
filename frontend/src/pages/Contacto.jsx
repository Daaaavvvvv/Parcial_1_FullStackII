import React, { useState, useEffect } from 'react';

export default function Contacto() {
  const MAX_CARACTERES = 500;
  const MAX_NOMBRE_CORREO = 100;

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  // Limpieza inicial al recargar la página (reemplaza 'beforeunload' / form.reset())
  useEffect(() => {
    setFormData({ nombre: '', correo: '', mensaje: '' });
    setErrores({});
  }, []);

  // Manejador del cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Impedir que se escriban más de 500 caracteres en el mensaje
    if (name === 'mensaje' && value.length > MAX_CARACTERES) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar el error del campo actual al escribir
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  // Lógica de validación traducida directamente de tu código
  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombre = formData.nombre.trim();
    const correo = formData.correo.trim();
    const mensaje = formData.mensaje.trim();

    // 1. Validar Nombre
    if (nombre === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (nombre.length > MAX_NOMBRE_CORREO) {
      nuevosErrores.nombre = 'El nombre no puede superar los 100 caracteres.';
    }

    // 2. Validar Correo
    if (correo === '') {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (correo.length > MAX_NOMBRE_CORREO) {
      nuevosErrores.correo = 'El correo no puede superar los 100 caracteres.';
    } else {
      const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
      const esValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
      if (!esValido) {
        nuevosErrores.correo = 'Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com';
      }
    }

    // 3. Validar Comentario / Mensaje
    if (mensaje === '') {
      nuevosErrores.mensaje = 'El comentario es obligatorio.';
    } else if (mensaje.length > MAX_CARACTERES) {
      nuevosErrores.mensaje = 'El comentario no puede superar los 500 caracteres.';
    }

    return nuevosErrores;
  };

  // Manejador de envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresDetectados = validarFormulario();

    if (Object.keys(erroresDetectados).length > 0) {
      setErrores(erroresDetectados);
    } else {
      // Todo es correcto
      setErrores({});
      setMensajeExito(true);

      // Resetea el formulario (lo equivalente a form.reset() y contador a 0)
      setFormData({
        nombre: '',
        correo: '',
        mensaje: ''
      });

      // Muestra una notificación o alert
      alert('¡Formulario enviado con éxito!');

      setTimeout(() => {
        setMensajeExito(false);
      }, 4000);
    }
  };

  const caracteresUsados = formData.mensaje.length;

  return (
    <section className="contact-section">
      <div className="contact-header">
        <img 
          src="/img/logo.png" 
          alt="Soporte Sonido Vivo" 
          className="contact-logo" 
        />
      </div>

      <div className="contact-card">
        <div className="form-header">
          <h2>ENVÍANOS UN MENSAJE</h2>
        </div>

        {mensajeExito && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px',
            margin: '15px 25px 0',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            ¡Mensaje enviado con éxito!
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Campo Nombre */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errores.nombre ? 'input-error' : ''}
              placeholder="Tu nombre y apellido"
            />
            <span id="error-nombre" className="error-msg">
              {errores.nombre || ''}
            </span>
          </div>

          {/* Campo Correo */}
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico*</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={errores.correo ? 'input-error' : ''}
              placeholder="ejemplo@duoc.cl"
            />
            <span id="error-correo" className="error-msg">
              {errores.correo || ''}
            </span>
          </div>

          {/* Campo Mensaje */}
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje*</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              className={errores.mensaje ? 'input-error' : ''}
              placeholder="Escribe tu mensaje o consulta..."
            ></textarea>
            
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span id="error-mensaje" className="error-msg">
                {errores.mensaje || ''}
              </span>
              
              {/* Contador de caracteres con cambio de color a rojo si pasa/llega a 500 */}
              <span 
                className="char-counter"
                style={{ color: caracteresUsados >= MAX_CARACTERES ? 'red' : '#666666' }}
              >
                {caracteresUsados}/{MAX_CARACTERES}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            ENVIAR MENSAJE
          </button>
        </form>
      </div>
    </section>
  );
}