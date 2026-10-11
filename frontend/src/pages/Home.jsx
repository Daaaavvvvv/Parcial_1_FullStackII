import { Link } from 'react-router-dom';
import Carrusel from '../components/Carrusel.jsx'; // 👈 Importas el carrusel

export default function Home() {
  return (
    <main className="container-home">
      {/* Hero Banner Principal reemplazado por el Carrusel */}
      <Carrusel />

      {/* Grilla de Productos Destacados */}
      <section className="products-grid">
        
        {/* Producto 1: Guitarra Fender */}
        <article className="product-card">
          <Link to="/productos/GT002" className="product-img-link">
            <div className="product-img">
              <img src="/img/gt002.jpg" alt="Guitarra Eléctrica" />
            </div>
          </Link>
          <div className="product-info">
            <h3>
              <Link to="/productos/GT002">Guitarra Eléctrica Fender</Link>
            </h3>
            <div className="product-details">
              <span className="attributes">Instrumentos</span>
              <span className="price">$249.990</span>
            </div>
          </div>
        </article>

        {/* Producto 2: Batería Roland */}
        <article className="product-card">
          <Link to="/productos/BT001" className="product-img-link">
            <div className="product-img">
              <img src="/img/bt001.jpg" alt="Batería Electrónica Roland" />
            </div>
          </Link>
          <div className="product-info">
            <h3>
              <Link to="/productos/BT001">Batería Electrónica Roland</Link>
            </h3>
            <div className="product-details">
              <span className="attributes">Instrumentos</span>
              <span className="price">$399.990</span>
            </div>
          </div>
        </article>

        {/* Producto 3: Teclado Casio */}
        <article className="product-card">
          <Link to="/productos/TC001" className="product-img-link">
            <div className="product-img">
              <img src="/img/tc001.jpg" alt="Teclado Casio" />
            </div>
          </Link>
          <div className="product-info">
            <h3>
              <Link to="/productos/TC001">Teclado Casio 61 teclas</Link>
            </h3>
            <div className="product-details">
              <span className="attributes">Instrumentos</span>
              <span className="price">$129.990</span>
            </div>
          </div>
        </article>

        {/* Producto 4: Amplificador Marshall */}
        <article className="product-card">
          <Link to="/productos/AM001" className="product-img-link">
            <div className="product-img">
              <img src="/img/am001.jpg" alt="Amplificador Marshall" />
            </div>
          </Link>
          <div className="product-info">
            <h3>
              <Link to="/productos/AM001">Amplificador Marshall 20W</Link>
            </h3>
            <div className="product-details">
              <span className="attributes">Amplificadores</span>
              <span className="price">$79.990</span>
            </div>
          </div>
        </article>

      </section>
    </main>
  );
}