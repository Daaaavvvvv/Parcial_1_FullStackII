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

  useEffect(() => {
    setFormData({ nombre: '', correo: '', mensaje: '' });
    setErrores({});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mensaje' && value.length > MAX_CARACTERES) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });

    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombre = formData.nombre.trim();
    const correo = formData.correo.trim();
    const mensaje = formData.mensaje.trim();

    if (nombre === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (nombre.length > MAX_NOMBRE_CORREO) {
      nuevosErrores.nombre = 'El nombre no puede superar los 100 caracteres.';
    }

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

    if (mensaje === '') {
      nuevosErrores.mensaje = 'El comentario es obligatorio.';
    } else if (mensaje.length > MAX_CARACTERES) {
      nuevosErrores.mensaje = 'El comentario no puede superar los 500 caracteres.';
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresDetectados = validarFormulario();

    if (Object.keys(erroresDetectados).length > 0) {
      setErrores(erroresDetectados);
    } else {
      setErrores({});
      setMensajeExito(true);
      setFormData({
        nombre: '',
        correo: '',
        mensaje: ''
      });
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
          alt="Contacto Sonido Vivo" 
          className="contact-logo" 
        />
      </div>

      {/* Contenedor principal en dos columnas (Grid o Flex según tu CSS base) */}
      <div className="contact-layout" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Columna Izquierda: Información de la tienda */}
        <div className="contact-info-card" style={{ flex: '1', minWidth: '300px', background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Información</h3>
          <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.5' }}>
            Llame directamente a nuestros ejecutivos, envíe un correo o bien complete el formulario.
          </p>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📞</span> <strong>Teléfono ejecutivo:</strong> +569 xxxx xxxx
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✉️</span> <strong>Correo:</strong> ventas@sonidovivo.cl
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📍</span> <strong>Dirección:</strong> General del Canto 135, Providencia – Santiago.
          </div>
        </div>

        {/* Columna Derecha: Formulario de contacto */}
        <div className="contact-card" style={{ flex: '1.5', minWidth: '300px' }}>
          <div className="form-header">
            <h2>Completa Aquí Con Tus Datos</h2>
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
              <label htmlFor="nombre">Tu nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errores.nombre ? 'input-error' : ''}
                placeholder="Nombre *"
              />
              <span id="error-nombre" className="error-msg">
                {errores.nombre || ''}
              </span>
            </div>

            {/* Campo Correo */}
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errores.correo ? 'input-error' : ''}
                placeholder="Correo *"
              />
              <span id="error-correo" className="error-msg">
                {errores.correo || ''}
              </span>
            </div>

            {/* Campo Mensaje / Comentario */}
            <div className="form-group">
              <label htmlFor="mensaje">Comentario</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                className={errores.mensaje ? 'input-error' : ''}
                placeholder="Comentario *"
              ></textarea>
              
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span id="error-mensaje" className="error-msg">
                  {errores.mensaje || ''}
                </span>
                
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

      </div>
    </section>
  );
}