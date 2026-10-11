
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  obtenerProducto,
  consultarProductos
} from '../services/productoService.js';
import {
  obtenerCarrito,
  agregarCantidadAlCarrito
} from '../services/carritoService.js';

export default function DetalleProducto() {
  const { codigo } = useParams();
  const producto = obtenerProducto(codigo);

  const [cantidad, setCantidad] = useState(1);
  const [aviso, setAviso] = useState('');
  const [carrito, setCarrito] = useState(obtenerCarrito);

  useEffect(() => {
    const actualizarCarrito = () => {
      setCarrito(obtenerCarrito());
    };

    window.addEventListener('carritoActualizado', actualizarCarrito);

    return () => {
      window.removeEventListener(
        'carritoActualizado',
        actualizarCarrito
      );
    };
  }, []);

  if (!producto) {
    return (
      <main className="contenedor-detalle">
        <div className="detalle-info">
          <h1>Producto no encontrado</h1>
          <p>El producto que buscas no existe.</p>

          <Link to="/productos" className="btn-agregar">
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  const relacionados = consultarProductos().filter(
    (item) =>
      item.categoria === producto.categoria &&
      item.codigo !== producto.codigo
  );

  const cantidadEnCarrito =
    carrito.find((item) => item.codigo === producto.codigo)?.cantidad || 0;

  const disponibles = Math.max(
    0,
    producto.stock - cantidadEnCarrito
  );

  const sinStock = disponibles === 0;

  const manejarAgregar = () => {
    try {
      agregarCantidadAlCarrito(producto.codigo, cantidad);
      setCantidad(1);
      setAviso('Producto agregado al carrito correctamente');
    } catch (error) {
      setAviso(error.message);
    }
  };

  return (
    <main className="contenedor-detalle">
      <nav
        className="breadcrumb"
        aria-label="Ruta de navegación"
      >
        <Link to="/">Home</Link>
        {' > '}
        <Link to="/productos">{producto.categoria}</Link>
        {' > '}
        <span>{producto.nombre}</span>
      </nav>

      <div className="detalle-grid">
        <div className="detalle-imagenes">
          <div className="detalle-imagen-principal">
            <img
              src={producto.imagen}
              alt={producto.nombre}
            />
          </div>

          <div className="detalle-miniaturas">
            <img
              src={producto.imagen}
              alt={`Miniatura de ${producto.nombre}`}
              className="miniatura activa"
            />
          </div>
        </div>

        <div className="detalle-info">
          <div className="detalle-encabezado">
            <h1>{producto.nombre}</h1>

            <span className="detalle-precio">
              ${producto.precio.toLocaleString('es-CL')}
            </span>
          </div>

          <hr />

          <p className="detalle-descripcion">
            {producto.descripcion || 'Sin descripción disponible.'}
          </p>

          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>

          <p>
            <strong>Código:</strong> {producto.codigo}
          </p>

          <p className="detalle-stock">
            {sinStock
              ? 'Sin unidades disponibles'
              : `${disponibles} unidades disponibles`}
          </p>

          <hr />

          <div className="detalle-cantidad">
            <label htmlFor="cantidad">Cantidad</label>

            <select
              id="cantidad"
              value={cantidad}
              disabled={sinStock}
              onChange={(e) => setCantidad(Number(e.target.value))}
            >
              {Array.from(
                { length: Math.min(disponibles, 10) },
                (_, i) => i + 1
              ).map((numero) => (
                <option key={numero} value={numero}>
                  {numero}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn-agregar"
            onClick={manejarAgregar}
            disabled={sinStock}
          >
            {sinStock ? 'Sin stock' : 'Añadir al carrito'}
          </button>

          {aviso && (
            <p
              role="status"
              className="detalle-aviso"
            >
              {aviso}
            </p>
          )}

          <div className="detalle-enlaces">
            <Link to="/productos">
              Seguir comprando
            </Link>

            <Link to="/carrito">
              Ver carrito
            </Link>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <>
          <hr className="separador-relacionados" />

          <section className="relacionados">
            <h3>Tenemos algo parecido...</h3>

            <div className="relacionados-grid">
              {relacionados.map((item) => (
                <Link
                  key={item.codigo}
                  to={`/productos/${item.codigo}`}
                  className="relacionado-item"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                  />

                  <p>{item.nombre}</p>

                  <span>
                    ${item.precio.toLocaleString('es-CL')}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
