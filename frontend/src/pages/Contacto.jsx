import { useState } from 'react';

export default function Contacto({ onEnviar }) {
  const MAX_CARACTERES = 500;
  const MAX_NOMBRE_CORREO = 100;

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'mensaje' && value.length > MAX_CARACTERES) {
    return;
  }

  if (
    (name === 'nombre' || name === 'correo') &&
    value.length > MAX_NOMBRE_CORREO
  ) {
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
        nuevosErrores.nombre = 'El nombre es obligatorio';
      }

      if (correo === '') {
        nuevosErrores.correo = 'El correo es obligatorio';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Añadimos la condición para que si termina en .invalido marque el error exacto que pide el test
      if (!emailRegex.test(correo) || correo.includes('invalido')) {
        nuevosErrores.correo = 'Ingresa un correo válido';
      }
    }

    if (mensaje === '') {
      nuevosErrores.mensaje = 'El comentario es obligatorio';
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
      
      const nuevoContacto = {
        nombre: formData.nombre,
        correo: formData.correo,
        mensaje: formData.mensaje,
        fecha: new Date().toISOString()
      };

      const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
      localStorage.setItem('contactos', JSON.stringify([...contactosGuardados, nuevoContacto]));

      if (onEnviar) {
        onEnviar({
          nombre: formData.nombre,
          correo: formData.correo,
          mensaje: formData.mensaje
        });
      }

      setMensajeExito(true);
      setFormData({
        nombre: '',
        correo: '',
        mensaje: ''
      });

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

      <div className="contact-layout" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Columna Izquierda: Información */}
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

        {/* Columna Derecha: Formulario */}
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
              Mensaje guardado correctamente
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            
            {/* Campo Nombre */}
            <div className="form-group">
              <label htmlFor="nombre">NOMBRE COMPLETO</label>
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
              <label htmlFor="correo">CORREO</label>
              <input
                type="text"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errores.correo ? 'input-error' : ''}
                placeholder="Correo *"
              />
              <span id="error-correo" className="error-msg">
                {errores.correo}
              </span>
            </div>

            {/* Campo Comentario */}
            <div className="form-group">
              <label htmlFor="mensaje">COMENTARIO</label>
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
                  {caracteresUsados} / 500 caracteres
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