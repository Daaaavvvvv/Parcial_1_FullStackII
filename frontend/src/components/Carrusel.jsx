import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    imagen: '/img/logoc.jpeg',
    link: '/productos',
    boton: '🛒 Ver productos',
    limpio: true,
  },
    {
    id: 2,
    imagen: '/img/carrusel2.jpg',
    link: '/productos',
    limpio: true,
  },
  {
    id: 3,
    titulo: 'GUITARRAS FENDER',
    texto: 'Descubre nuestra selección de guitarras eléctricas Fender con calidad profesional y sonido legendario.',
    imagen: '/img/gt001.jpg',
    link: '/productos/GT002',
    boton: 'Ver modelos',
  },
  {
    id: 4,
    titulo: 'BATERÍAS ROLAND',
    texto: 'Potencia tu ritmo con las mejores baterías electrónicas Roland para práctica y estudio.',
    imagen: '/img/bt001.jpg',
    link: '/productos/BT001',
    boton: 'Ver baterías',
  },
];

export default function Carrusel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  const siguiente = () => {
    setActual((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const anterior = () => {
    setActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="carrusel-full-container" style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '1200px', 
      height: '450px', 
      margin: '0 auto 2rem auto', 
      overflow: 'hidden', 
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)' 
    }}>
      {/* Slides */}
      <div className="carrusel-inner" style={{ 
        display: 'flex', 
        width: '100%',
        height: '100%',
        transition: 'transform 1s ease-in-out', 
        transform: `translateX(-${actual * 100}%)`
      }}>
        {slides.map((slide) => (
          slide.limpio ? (

            <Link 
              to={slide.link} 
              key={slide.id} 
              style={{ 
                minWidth: '100%', 
                height: '100%',
                boxSizing: 'border-box', 
                position: 'relative',
                backgroundImage: `url(${slide.imagen})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat',
                display: 'block',
                textDecoration: 'none'
              }}
            >
              {/* Botón flotante abajo en el primer slide */}
              <div style={{ 
                position: 'absolute',
                bottom: '30px', 
                left: '50%',
                transform: 'translateX(-50% )',
                padding: '0.6rem 1.4rem',
                background: '#222', 
                color: '#fff', 
                borderRadius: '4px', 
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                zIndex: 2
              }}>
                {slide.boton}
              </div>
            </Link>
          ) : (
            <div key={slide.id} style={{ 
              minWidth: '100%', 
              height: '100%',
              boxSizing: 'border-box', 
              position: 'relative',
              backgroundImage: `url(${slide.imagen})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }} />

              <div style={{ 
                position: 'absolute',
                bottom: '45px', 
                left: '50%',
                transform: 'translateX(-50%)',
                width: '75%', 
                maxWidth: '500px',
                padding: '1.2rem 2rem',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                color: '#111',
                zIndex: 1,
                textAlign: 'center'
              }}>
                {slide.titulo && (
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', fontWeight: 'bold' }}>
                    {slide.titulo}
                  </h2>
                )}
                
                {slide.texto && (
                  <p style={{ fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {slide.texto}
                  </p>
                )}

                <Link to={slide.link} className="btn-carrusel-full" style={{ 
                  display: 'inline-block', 
                  padding: '0.6rem 1.2rem', 
                  background: '#222', 
                  color: '#fff', 
                  textDecoration: 'none', 
                  borderRadius: '4px', 
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.3)'
                }}>
                  {slide.boton}
                </Link>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Flechas de navegación */}
      <button onClick={anterior} style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', color: '#111', border: 'none', padding: '1rem', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', zIndex: 10 }}>
        &#10094;
      </button>
      <button onClick={siguiente} style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', color: '#111', border: 'none', padding: '1rem', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', zIndex: 10 }}>
        &#10095;
      </button>

      {/* Indicadores */}
      <div style={{ position: 'absolute', bottom: '15px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 10 }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActual(idx)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: '2px solid #fff',
              background: actual === idx ? '#fff' : 'transparent',
              cursor: 'pointer',
              boxShadow: '0 0 4px rgba(0,0,0,0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
}