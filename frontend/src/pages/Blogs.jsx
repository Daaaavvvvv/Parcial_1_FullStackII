import React from 'react';
import { Link } from 'react-router-dom';

export default function Blogs() {
  return (
    <main className="blog-container">
      <h1 className="blog-title">Noticias Importantes</h1>

      {/* Artículo 1 */}
      <article className="blog-card">
        <div className="blog-content">
          <span className="blog-tag"></span>
          <h2>Los instrumentos detrás de las leyendas</h2>
          <p className="blog-meta">Publicado el 1 de Septiembre, 2026</p>
          <p className="blog-excerpt">
            Descubre los secretos detrás de los instrumentos más icónicos, cómo cuidar tu equipamiento musical y qué marcas prefieren los grandes músicos.
          </p>
          {/* ID Fijo 1 */}
          <Link to="/blogs/1" className="btn-blog">LEER ARTÍCULO</Link> 
        </div>
        <div className="blog-image">
          <img src="/img/rockeros.png" alt="Rockeros" />
        </div>
      </article>

      {/* Artículo 2 */}
      <article className="blog-card">
        <div className="blog-content">
          <span className="blog-tag"></span>
          <h2>El origen secreto de la Fender Stratocaster</h2>
          <p className="blog-meta">Publicado el 5 de Septiembre, 2026</p>
          <p className="blog-excerpt">
            ¿Sabías que este clásico del rock nació de un diseño pensado originalmente para música country? Te contamos la fascinante historia detrás de este mito.
          </p>
          {/* ID Fijo 2 */}
          <Link to="/blogs/2" className="btn-blog">LEER ARTÍCULO</Link>
        </div>
        <div className="blog-image">
          <img src="/img/fender.png" alt="Fender Stratocaster" />
        </div>
      </article>
    </main>
  );
}