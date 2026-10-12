
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obtenerCarrito,
  cambiarCantidad,
  eliminarDelCarrito
} from '../services/carritoService.js';

export default function Carrito() {
  const [productos, setProductos] = useState(obtenerCarrito);
  const [error, setError] = useState('');

  useEffect(() => {
    const actualizarCarrito = () => {
      setProductos(obtenerCarrito());
    };

    window.addEventListener('carritoActualizado', actualizarCarrito);

    return () => {
      window.removeEventListener('carritoActualizado', actualizarCarrito);
    };
  }, []);

  const modificarCantidad = (codigo, cantidad) => {
    setError('');

    try {
      if (cantidad < 1) {
        eliminarDelCarrito(codigo);
      } else {
        cambiarCantidad(codigo, cantidad);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const quitarProducto = (codigo) => {
    setError('');
    eliminarDelCarrito(codigo);
  };

  const formatoPrecio = (precio) => {
    return Number(precio).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });
  };

  const total = productos.reduce(
  (acumulado, producto) =>
    acumulado + Number(producto.precio) * producto.cantidad,
  0
);

  return (
    <main className="container py-5 carrito-page">
        <h1 className="mb-4">Carrito de compras</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {productos.length === 0 ? (
        <div className="text-center py-5">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra.</p>
          <Link to="/productos" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.codigo}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {producto.imagen && (
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            width="70"
                            height="70"
                            style={{ objectFit: 'contain' }}
                          />
                        )}
                        <span>{producto.nombre}</span>
                      </div>
                    </td>

                    <td>{formatoPrecio(producto.precio)}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          aria-label={`Disminuir cantidad de ${producto.nombre}`}
                          onClick={() =>
                            modificarCantidad(
                              producto.codigo,
                              producto.cantidad - 1
                            )
                          }
                        >
                          -
                        </button>

                        <span>{producto.cantidad}</span>

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          aria-label={`Aumentar cantidad de ${producto.nombre}`}
                          onClick={() =>
                            modificarCantidad(
                              producto.codigo,
                              producto.cantidad + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      {formatoPrecio(
                        producto.precio * producto.cantidad
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => quitarProducto(producto.codigo)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4">
            <h3>Total: {formatoPrecio(total)}</h3>

            <Link to="/productos" className="btn btn-secondary me-2">
              Seguir comprando
            </Link>

            <Link to="/checkout" className="btn btn-success">
              Continuar al pago
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
