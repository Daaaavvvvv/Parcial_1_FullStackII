
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  consultarProductosStockBajo
} from '../services/productoService.js';

export default function AdminStockBajo() {
  const [productos] = useState(consultarProductosStockBajo);

  return (
    <section>
      <div className="admin-header-tabla">
        <h1>Productos con pocas unidades</h1>

        <Link
          className="btn-nuevo"
          to="/admin/productos"
        >
          Volver a productos
        </Link>
      </div>

      <p className="admin-descripcion">
        Se muestran los productos cuyo stock alcanzó
        su nivel crítico. Si no se definió uno,
        el límite es de 5 unidades.
      </p>

      {productos.length === 0 ? (
        <div className="admin-panel">
          <p>No hay productos con stock bajo.</p>
        </div>
      ) : (
        <div className="admin-tabla-contenedor">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock actual</th>
                <th>Stock crítico</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.codigo}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.stockCritico ?? 5}</td>
                  <td>
                    <Link
                      className="btn-accion"
                      to={`/admin/productos/${encodeURIComponent(
                        producto.codigo
                      )}/editar`}
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
