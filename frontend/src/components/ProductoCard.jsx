import { Link } from 'react-router-dom';

export default function ProductoCard({ producto, onAgregar }) {
  const sinStock = producto.stock <= 0;
  const rutaDetalle = `/productos/${producto.codigo}`;

  return (
    <div className="producto-card">
      <Link to={rutaDetalle} className="producto-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </Link>

      <div className="producto-info">
        <Link to={rutaDetalle} className="producto-nombre-link">
          <h3>{producto.nombre}</h3>
        </Link>

        <p className="producto-precio">
          ${producto.precio.toLocaleString('es-CL')}
        </p>

        <p className="producto-stock">
          {sinStock ? 'Sin stock' : `Stock: ${producto.stock}`}
        </p>

        <button
          type="button"
          className="btn-agregar-card"
          disabled={sinStock}
          onClick={() => onAgregar(producto.codigo)}
        >
          {sinStock ? 'Sin stock' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
}