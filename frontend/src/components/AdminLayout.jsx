
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../services/sesionService.js';

export default function AdminLayout() {
  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          Sonido Vivo
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => isActive ? 'activo' : ''}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/productos"
                className={({ isActive }) => isActive ? 'activo' : ''}
              >
                Productos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/usuarios"
                className={({ isActive }) => isActive ? 'activo' : ''}
              >
                Usuarios
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/pedidos"
                className={({ isActive }) => isActive ? 'activo' : ''}
              >
                Pedidos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/reportes"
                className={({ isActive }) => isActive ? 'activo' : ''}
              >
                Reportes
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-cerrar-sesion"
            onClick={salir}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="admin-contenido">
        <Outlet />
      </main>
    </div>
  );
}
