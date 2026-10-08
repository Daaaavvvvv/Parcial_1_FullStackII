import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PaginaPendiente from './pages/PaginaPendiente.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import SobreNosotros from './pages/SobreNosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import './assets/styles.css';

function App() {
  return (
    <div className="container py-4">
      <nav
        className="d-flex flex-wrap gap-3 mb-4"
        aria-label="Navegación provisional"
      >
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/categorias">Categorías</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/registro">Registrarse</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/admin">Administración</Link>
      </nav>

      <Routes>
        {/* Tienda */}
        <Route path="/" element={<PaginaPendiente titulo="Inicio" />} />
        <Route path="/productos" element={<PaginaPendiente titulo="Productos" />} />
        <Route path="/productos/:codigo" element={<PaginaPendiente titulo="Detalle de producto" />} />
        <Route path="/categorias" element={<PaginaPendiente titulo="Categorías" />} />
        <Route path="/categorias/:id" element={<PaginaPendiente titulo="Productos de la categoría" />} />
        <Route path="/ofertas" element={<PaginaPendiente titulo="Ofertas" />} />
        <Route path="/nosotros" element={<PaginaPendiente titulo="Nosotros" />} />
        <Route path="/contacto" element={<PaginaPendiente titulo="Contacto" />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<PaginaPendiente titulo="Detalle del blog" />} />

        {/* Acceso */}
        <Route path="/login" element={<PaginaPendiente titulo="Iniciar sesión" />} />
        <Route path="/registro" element={<PaginaPendiente titulo="Registro" />} />

        {/* Compra */}
        <Route path="/carrito" element={<PaginaPendiente titulo="Carrito" />} />
        <Route path="/checkout" element={<PaginaPendiente titulo="Datos de compra" />} />
        <Route path="/compra/exitosa" element={<PaginaPendiente titulo="Compra exitosa" />} />
        <Route path="/compra/error" element={<PaginaPendiente titulo="Compra fallida" />} />

        {/* Administración de productos */}
        <Route path="/admin" element={<PaginaPendiente titulo="Panel de administración" />} />
        <Route path="/admin/productos" element={<PaginaPendiente titulo="Administrar productos" />} />
        <Route path="/admin/productos/nuevo" element={<PaginaPendiente titulo="Nuevo producto" />} />
        <Route path="/admin/productos/stock-bajo" element={<PaginaPendiente titulo="Productos con pocas unidades" />} />
        <Route path="/admin/productos/:codigo" element={<PaginaPendiente titulo="Consultar producto" />} />
        <Route path="/admin/productos/:codigo/editar" element={<PaginaPendiente titulo="Editar producto" />} />

        {/* Administración de categorías */}
        <Route path="/admin/categorias" element={<PaginaPendiente titulo="Administrar categorías" />} />
        <Route path="/admin/categorias/nueva" element={<PaginaPendiente titulo="Nueva categoría" />} />
        <Route path="/admin/categorias/:id/editar" element={<PaginaPendiente titulo="Editar categoría" />} />

        {/* Administración de usuarios */}
        <Route path="/admin/usuarios" element={<PaginaPendiente titulo="Administrar usuarios" />} />
        <Route path="/admin/usuarios/nuevo" element={<PaginaPendiente titulo="Nuevo usuario" />} />
        <Route path="/admin/usuarios/:id" element={<PaginaPendiente titulo="Consultar usuario" />} />
        <Route path="/admin/usuarios/:id/editar" element={<PaginaPendiente titulo="Editar usuario" />} />
        <Route path="/admin/usuarios/:id/compras" element={<PaginaPendiente titulo="Historial de compras" />} />

        {/* Pedidos y reportes */}
        <Route path="/admin/pedidos" element={<PaginaPendiente titulo="Pedidos" />} />
        <Route path="/admin/pedidos/:id" element={<PaginaPendiente titulo="Detalle del pedido" />} />
        <Route path="/admin/reportes" element={<PaginaPendiente titulo="Reportes" />} />
        <Route path="/admin/perfil" element={<PaginaPendiente titulo="Perfil" />} />

        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </div>
  );
}

export default App;