import React from 'react';

export default function SobreNosotros() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Sobre Sonido Vivo</h1>
        <p className="subtitle">
          Conoce nuestra historia y nuestra pasión por la música.
        </p>
      </section>

      {/* Historia Section */}
      <section className="about-history">
        <div className="history-content">
          <h2>Nuestra historia</h2>
          <p>
            Sonido Vivo nació en Viña del Mar con el objetivo de acercar
            instrumentos musicales de calidad a músicos de todos los niveles...
          </p>
        </div>
      </section>

      {/* Misión y Visión Grid */}
      <section className="about-values">
        <div className="card">
          <h3>Misión</h3>
          <p>
            Ofrecer instrumentos y accesorios musicales accesibles y de calidad
            para potenciar el talento local...
          </p>
        </div>
        <div className="card">
          <h3>Visión</h3>
          <p>
            Ser la tienda de referencia en instrumentos musicales en la región,
            destacando por la atención personalizada...
          </p>
        </div>
      </section>

      {/* Desarrolladores Section */}
      <section className="about-developers">
        <div className="developers-content">
          <h2>Desarrolladores</h2>
          <ul>
            <li>Vanessa Roberson</li>
            <li>David Navarrete</li>
            <li>Isaac Manzor</li>
          </ul>
        </div>
      </section>
    </div>
  );
}