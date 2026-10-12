
import { Link, useParams } from 'react-router-dom';
import { obtenerPedidos } from '../services/pedidoService.js';

export default function AdminDetallePedido() {
  const { id } = useParams();

  const pedido = obtenerPedidos().find(
    (item) => item.id === id
  );

  const formatoPrecio = (valor) =>
    Number(valor || 0).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });

  const formatoFecha = (fecha) => {
    const fechaValida = new Date(fecha);

    if (Number.isNaN(fechaValida.getTime())) {
      return 'Fecha inválida';
    }

    return fechaValida.toLocaleString('es-CL');
  };

  if (!pedido) {
    return (
      <section>
        <h1>Pedido no encontrado</h1>

        <p>
          No existe un pedido registrado con el identificador {id}.
        </p>

        <Link to="/admin/pedidos" className="btn-nuevo">
          Volver a pedidos
        </Link>
      </section>
    );
  }

  return (
    <>
      <div className="admin-header-tabla">
        <h1>Detalle del pedido</h1>

        <Link to="/admin/pedidos" className="btn-nuevo">
          Volver a pedidos
        </Link>
      </div>

      <section className="admin-panel">
        <h2>Resumen de compra</h2>

        <div className="admin-detalle">
          <p>
            <strong>Número de pedido:</strong> {pedido.id}
          </p>

          <p>
            <strong>Fecha:</strong> {formatoFecha(pedido.fecha)}
          </p>

          <p>
            <strong>Estado:</strong> {pedido.estado}
          </p>

          <p>
            <strong>Nombre del comprador:</strong>{' '}
            {pedido.comprador?.nombre || 'No informado'}
          </p>

          <p>
            <strong>Correo:</strong>{' '}
            {pedido.comprador?.correo || 'No informado'}
          </p>

          <p>
            <strong>Tipo de entrega:</strong>{' '}
            {pedido.entrega === 'despacho'
              ? 'Despacho a domicilio'
              : 'Retiro en tienda'}
          </p>

          {pedido.entrega === 'despacho' && (
            <p>
              <strong>Dirección:</strong>{' '}
              {pedido.direccion || 'No informada'}
            </p>
          )}
        </div>
      </section>

      <section className="admin-panel">
        <h2>Productos del pedido</h2>

        {!pedido.productos || pedido.productos.length === 0 ? (
          <p>Este pedido no contiene productos registrados.</p>
        ) : (
          <div className="admin-tabla-contenedor">
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {pedido.productos.map((item, indice) => (
                  <tr
                    key={`${item.codigo}-${indice}`}
                  >
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>
                    <td>{formatoPrecio(item.precio)}</td>
                    <td>{item.cantidad}</td>
                    <td>
                      {formatoPrecio(
                        item.subtotal ??
                        item.precio * item.cantidad
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th colSpan={4}>Total del pedido</th>
                  <th>{formatoPrecio(pedido.total)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
