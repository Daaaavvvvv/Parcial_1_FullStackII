import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  consultarProductos,
  consultarProductosStockBajo
} from '../services/productoService.js';
import { consultarCategorias } from '../services/categoriaService.js';
import { obtenerUsuarios } from '../services/usuarioService.js';
import { obtenerPedidos } from '../services/pedidoService.js';
import { obtenerSesion } from '../services/sesionService.js';

const MAXIMO_EN_LISTAS = 5;

const formatoPrecio = (valor) =>
  Number(valor || 0).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });

const formatoFecha = (fecha) =>
  new Date(fecha).toLocaleDateString('es-CL');

function Tarjeta({ titulo, valor, detalle, to, alerta = false }) {
  return (
    <Link
      to={to}
      className={`admin-tarjeta${alerta ? ' admin-tarjeta-alerta' : ''}`}
    >
      <h2>{titulo}</h2>
      <p className="admin-indicador">{valor}</p>
      <span>{detalle}</span>
    </Link>
  );
}

export default function AdminDashboard() {
  const [resumen] = useState(() => {
    const pedidos = obtenerPedidos();
    const usuarios = obtenerUsuarios();

    const pedidosConfirmados = pedidos.filter(
      (pedido) => String(pedido.estado).toLowerCase() === 'confirmado'
    );

    return {
      nombre: obtenerSesion()?.nombreCompleto?.split(' ')[0] || 'Administrador',
      totalProductos: consultarProductos().length,
      stockBajo: consultarProductosStockBajo(),
      totalCategorias: consultarCategorias().length,
      totalUsuarios: usuarios.length,
      usuariosActivos: usuarios.filter((u) => u.activo).length,
      totalPedidos: pedidos.length,
      ventas: pedidosConfirmados.reduce(
        (total, pedido) => total + Number(pedido.total || 0),
        0
      ),
      // los pedidos se guardan en orden de llegada: se muestran los últimos primero
      ultimosPedidos: [...pedidos].reverse().slice(0, MAXIMO_EN_LISTAS)
    };
  });

  return (
    <>
      <h1>¡Hola, {resumen.nombre}!</h1>

      <p className="admin-descripcion">
        Bienvenido al panel de gestión de Sonido Vivo. Este es el resumen
        de la tienda.
      </p>

      <div className="admin-dashboard-grid">
        <Tarjeta
          titulo="Productos"
          valor={resumen.totalProductos}
          detalle="Ver productos"
          to="/admin/productos"
        />

        <Tarjeta
          titulo="Stock bajo"
          valor={resumen.stockBajo.length}
          detalle="Ver productos con pocas unidades"
          to="/admin/productos/stock-bajo"
          alerta={resumen.stockBajo.length > 0}
        />

        <Tarjeta
          titulo="Categorías"
          valor={resumen.totalCategorias}
          detalle="Administrar categorías"
          to="/admin/categorias"
        />

        <Tarjeta
          titulo="Usuarios"
          valor={resumen.totalUsuarios}
          detalle={`${resumen.usuariosActivos} activos`}
          to="/admin/usuarios"
        />

        <Tarjeta
          titulo="Pedidos"
          valor={resumen.totalPedidos}
          detalle="Ver pedidos"
          to="/admin/pedidos"
        />

        <Tarjeta
          titulo="Ventas confirmadas"
          valor={formatoPrecio(resumen.ventas)}
          detalle="Ver reportes"
          to="/admin/reportes"
        />
      </div>

      <section
        className="admin-panel admin-dashboard-seccion"
        aria-label="Productos con pocas unidades"
      >
        <div className="admin-header-tabla">
          <h2>Productos con pocas unidades</h2>

          <Link to="/admin/productos/stock-bajo" className="btn-accion">
            Ver todos
          </Link>
        </div>

        {resumen.stockBajo.length === 0 ? (
          <p>No hay productos con pocas unidades.</p>
        ) : (
          <div className="admin-tabla-contenedor">
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {resumen.stockBajo.slice(0, MAXIMO_EN_LISTAS).map((producto) => (
                  <tr key={producto.codigo}>
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <Link
                        className="btn-accion"
                        to={`/admin/productos/${encodeURIComponent(producto.codigo)}/editar`}
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

      <section
        className="admin-panel admin-dashboard-seccion"
        aria-label="Últimos pedidos"
      >
        <div className="admin-header-tabla">
          <h2>Últimos pedidos</h2>

          <Link to="/admin/pedidos" className="btn-accion">
            Ver todos
          </Link>
        </div>

        {resumen.ultimosPedidos.length === 0 ? (
          <p>Todavía no hay pedidos registrados.</p>
        ) : (
          <div className="admin-tabla-contenedor">
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Fecha</th>
                  <th>Comprador</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Detalle</th>
                </tr>
              </thead>

              <tbody>
                {resumen.ultimosPedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{formatoFecha(pedido.fecha)}</td>
                    <td>{pedido.comprador?.nombre || 'Sin nombre'}</td>
                    <td>{formatoPrecio(pedido.total)}</td>
                    <td>{pedido.estado || 'Sin estado'}</td>
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
            </table>
          </div>
        )}
      </section>
    </>
  );
}