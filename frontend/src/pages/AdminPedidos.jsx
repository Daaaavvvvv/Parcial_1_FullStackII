
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPedidos } from '../services/pedidoService.js';

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState(obtenerPedidos);
  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState('todos');

  const formatoPrecio = (valor) =>
    Number(valor || 0).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });

  const formatoFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';

    const fechaValida = new Date(fecha);

    if (Number.isNaN(fechaValida.getTime())) {
      return 'Fecha inválida';
    }

    return fechaValida.toLocaleString('es-CL');
  };

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const termino = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      String(pedido.id).toLowerCase().includes(termino) ||
      String(pedido.comprador?.nombre || '')
        .toLowerCase()
        .includes(termino) ||
      String(pedido.comprador?.correo || '')
        .toLowerCase()
        .includes(termino);

    const coincideEstado =
      estado === 'todos' || pedido.estado === estado;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <>
      <div className="admin-header-tabla">
        <h1>Administración de pedidos</h1>

        <button
          type="button"
          className="btn-nuevo"
          onClick={() => setPedidos(obtenerPedidos())}
        >
          Actualizar listado
        </button>
      </div>

      <p className="admin-descripcion">
        Consulta los pedidos registrados y revisa sus resúmenes de compra.
      </p>

      <div className="admin-panel">
        <div className="admin-filtros-pedidos">
          <div>
            <label htmlFor="buscar-pedido">
              Buscar pedido
            </label>

            <input
              id="buscar-pedido"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Número, comprador o correo"
            />
          </div>

          <div>
            <label htmlFor="filtrar-estado">
              Estado
            </label>

            <select
              id="filtrar-estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="confirmado">Confirmado</option>
            </select>
          </div>
        </div>
      </div>

      {pedidosFiltrados.length === 0 ? (
        <div className="admin-panel">
          <p>
            {pedidos.length === 0
              ? 'Todavía no hay pedidos registrados.'
              : 'No se encontraron pedidos con esos filtros.'}
          </p>
        </div>
      ) : (
        <div className="admin-tabla-contenedor">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>N.º pedido</th>
                <th>Fecha</th>
                <th>Comprador</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{formatoFecha(pedido.fecha)}</td>
                  <td>
                    {pedido.comprador?.nombre || 'Sin nombre'}
                    <br />
                    <small>
                      {pedido.comprador?.correo || 'Sin correo'}
                    </small>
                  </td>
                  <td>
                    {(pedido.productos || []).reduce(
                      (total, item) => total + Number(item.cantidad || 0),
                      0
                    )}
                  </td>
                  <td>{formatoPrecio(pedido.total)}</td>
                  <td>{pedido.estado || 'Sin estado'}</td>
                  <td>
                    <Link
                      className="btn-accion"
                      to={`/admin/pedidos/${encodeURIComponent(pedido.id)}`}
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="admin-descripcion">
        Pedidos encontrados: {pedidosFiltrados.length}
      </p>
    </>
  );
}
