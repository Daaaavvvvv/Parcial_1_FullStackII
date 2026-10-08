import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from '../data/blogsData';

export const DetalleBlog = () => {
  const { id } = useParams(); // Obtiene el id ("1" o "2") desde la URL /blogs/:id
  const blog = blogsData.find((item) => item.id === id);

  // Pantalla cuando el artículo no se encuentra
  if (!blog) {
    return (
      <main className="container-blogs">
        <div className="blog-detail" style={{ textAlign: 'center' }}>
          <h2>El artículo solicitado no existe.</h2>
          <Link to="/blogs" className="btn-back">← Volver al Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-blogs">
      <article className="blog-detail">
        <header className="detail-header">
          <span className="category">{blog.categoria}</span>
          <h1>{blog.titulo}</h1>
          <div className="meta-info">
            <span>{blog.fecha}</span> • <span>Por {blog.autor}</span>
          </div>
        </header>

        <div className={blog.claseImagen || "detail-main-image"}>
          <img src={blog.imagen} alt={blog.titulo} />
        </div>

        {/* Renderizado dinámico de párrafos, subtítulos y citas */}
        <section className="detail-content">
          {blog.contenido.map((bloque, index) => {
            if (bloque.tipo === 'subtitulo') {
              return (
                <h3 
                  key={index} 
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    marginTop: '1.5rem', 
                    marginBottom: '0.75rem' 
                  }}
                >
                  {bloque.texto}
                </h3>
              );
            }

            if (bloque.tipo === 'cita') {
              return (
                <blockquote 
                  key={index} 
                  style={{
                    borderLeft: '4px solid #333',
                    paddingLeft: '1rem',
                    margin: '1.5rem 0',
                    fontStyle: 'italic',
                    color: '#555',
                    backgroundColor: '#f9f9f9',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem'
                  }}
                >
                  {bloque.texto}
                </blockquote>
              );
            }

            return (
              <p key={index} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {bloque.texto}
              </p>
            );
          })}
        </section>

        <div className="store-callout">
          <p>¿Buscas el mejor equipamiento de sonido?</p>
          <Link to="/productos" className="btn-hero">Ir a la Tienda</Link>
        </div>

        <Link to="/blogs" className="btn-back">← Volver a los artículos</Link>
      </article>
    </main>
  );
};