
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPedidos } from '../services/pedidoService.js';

function fechaParaInput(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
}

export default function AdminReportes() {
  const hoy = new Date();

  const [desde, setDesde] = useState(() =>
    fechaParaInput(new Date(hoy.getFullYear(), hoy.getMonth(), 1))
  );

  const [hasta, setHasta] = useState(() =>
    fechaParaInput(hoy)
  );

  const [pedidos, setPedidos] = useState(obtenerPedidos);

  const formatoPrecio = (valor) =>
    Number(valor || 0).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });

  const formatoFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-CL');

  const fechasInvalidas =
    Boolean(desde && hasta && desde > hasta);

  const pedidosConfirmados = pedidos.filter(
    (pedido) =>
      String(pedido.estado).toLowerCase() === 'confirmado'
  );

  const pedidosPeriodo = fechasInvalidas
    ? []
    : pedidosConfirmados.filter((pedido) => {
        const fechaPedido = new Date(pedido.fecha);

        if (Number.isNaN(fechaPedido.getTime())) {
          return false;
        }

        if (desde) {
          const fechaDesde = new Date(`${desde}T00:00:00`);

          if (fechaPedido < fechaDesde) {
            return false;
          }
        }

        if (hasta) {
          const fechaHasta = new Date(`${hasta}T23:59:59.999`);

          if (fechaPedido > fechaHasta) {
            return false;
          }
        }

        return true;
      });

  const totalVentas = pedidosPeriodo.reduce(
    (total, pedido) => total + Number(pedido.total || 0),
    0
  );

  const unidadesVendidas = pedidosPeriodo.reduce(
    (total, pedido) =>
      total +
      (pedido.productos || []).reduce(
        (cantidad, item) =>
          cantidad + Number(item.cantidad || 0),
        0
      ),
    0
  );

  return (
    <>
      <div className="admin-header-tabla">
        <h1>Reportes de ventas</h1>

        <button
          type="button"
          className="btn-nuevo"
          onClick={() => setPedidos(obtenerPedidos())}
        >
          Actualizar reporte
        </button>
      </div>

      <p className="admin-descripcion">
        Consulta las ventas generadas por compras confirmadas
        durante el período seleccionado.
      </p>

      <section className="admin-panel">
        <h2>Seleccionar período</h2>

        <div className="admin-filtros-pedidos">
          <div>
            <label htmlFor="fecha-desde">Desde</label>
            <input
              id="fecha-desde"
              type="date"
              value={desde}
              max={hasta || undefined}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="fecha-hasta">Hasta</label>
            <input
              id="fecha-hasta"
              type="date"
              value={hasta}
              min={desde || undefined}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
        </div>

        {fechasInvalidas && (
          <p role="alert" className="error-msg">
            La fecha inicial no puede ser posterior a la fecha final.
          </p>
        )}
      </section>

      <div className="admin-resumen-ventas">
        <section className="admin-panel">
          <h2>Total de ventas</h2>
          <p className="admin-indicador">
            {formatoPrecio(totalVentas)}
          </p>
        </section>

        <section className="admin-panel">
          <h2>Pedidos confirmados</h2>
          <p className="admin-indicador">
            {pedidosPeriodo.length}
          </p>
        </section>

        <section className="admin-panel">
          <h2>Unidades vendidas</h2>
          <p className="admin-indicador">
            {unidadesVendidas}
          </p>
        </section>
      </div>

      <section>
        <h2>Compras incluidas en el reporte</h2>

        {pedidosPeriodo.length === 0 ? (
          <div className="admin-panel">
            <p>
              No hay compras confirmadas para el período seleccionado.
            </p>
          </div>
        ) : (
          <div className="admin-tabla-contenedor">
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Fecha</th>
                  <th>Comprador</th>
                  <th>Total</th>
                  <th>Detalle</th>
                </tr>
              </thead>

              <tbody>
                {pedidosPeriodo.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{formatoFecha(pedido.fecha)}</td>
                    <td>
                      {pedido.comprador?.nombre || 'Sin nombre'}
                    </td>
                    <td>{formatoPrecio(pedido.total)}</td>
                    <td>
                      <Link
                        className="btn-accion"
                        to={`/admin/pedidos/${encodeURIComponent(pedido.id)}`}
                      >
                        Ver pedido
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th colSpan={3}>Total del período</th>
                  <th>{formatoPrecio(totalVentas)}</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
