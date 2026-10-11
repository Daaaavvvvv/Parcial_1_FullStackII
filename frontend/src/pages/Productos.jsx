import { useState } from 'react';
import ProductoCard from '../components/ProductoCard.jsx';
import { consultarProductos } from '../services/productoService.js';
import { agregarAlCarrito } from '../services/carritoService.js';

export default function Productos() {
  const [productos] = useState(consultarProductos);
  const [aviso, setAviso] = useState(null);

  const manejarAgregar = (codigo) => {
    try {
      agregarAlCarrito(codigo);
      setAviso({ tipo: 'ok', texto: 'Producto agregado al carrito correctamente' });
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    }
  };

  return (
    <section className="contenedor-productos">
      <h1 className="cart-title">Catálogo de Productos</h1>

      {aviso && (
        <p role={aviso.tipo === 'error' ? 'alert' : 'status'}>
          {aviso.texto}
        </p>
      )}

      {productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.codigo}
              producto={producto}
              onAgregar={manejarAgregar}
            />
          ))}
        </div>
      )}
    </section>
  );
}