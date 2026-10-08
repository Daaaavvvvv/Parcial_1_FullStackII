import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from '../data/blogsData';

export const DetalleBlog = () => {
  const { id } = useParams(); // Obtiene el id (ej: "1" o "2") desde la URL /blogs/:id
  const blog = blogsData.find((item) => item.id === id);

  // Pantalla cuando el artículo no se encuentra
  if (!blog) {
    return (
      <main className="container-blogs">
        <div className="blog-detail" style={{ textAlign: 'center' }}>
          <h2>El artículo solicitado no existe.</h2>
          {/* Corregido: /blogs en plural */}
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

        <div className="detail-main-image">
          <img src={blog.imagen} alt={blog.titulo} />
        </div>

        <section className="detail-content">
          <p className="lead">{blog.copete}</p>
          {blog.contenido.map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </section>

        <div className="store-callout">
          <p>¿Buscas el mejor equipamiento de sonido?</p>
          {/* Corregido: /productos en lugar de /tienda */}
          <Link to="/productos" className="btn-hero">Ir a la Tienda</Link>
        </div>

        {/* Corregido: /blogs en plural */}
        <Link to="/blogs" className="btn-back">← Volver a los artículos</Link>
      </article>
    </main>
  );
};