import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import PaginaPendiente from './pages/PaginaPendiente.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import Home from './pages/Home';
import SobreNosotros from './pages/SobreNosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import Contacto from './pages/Contacto.jsx';
import { DetalleBlog } from './pages/DetalleBlog';
import Productos from './pages/Productos.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import AdminUsuarios from './pages/AdminUsuarios.jsx';
import NuevoUsuario from './pages/NuevoUsuario.jsx';
import EditarUsuario from './pages/EditarUsuario.jsx';
import './assets/styles.css';

function App() {
  return (
    <Routes>
      {/* 1. Rutas de la Tienda (con Layout general, Navbar y Footer) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:codigo" element={<PaginaPendiente titulo="Detalle de producto" />} />
        <Route path="categorias" element={<PaginaPendiente titulo="Categorías" />} />
        <Route path="categorias/:id" element={<PaginaPendiente titulo="Productos de la categoría" />} />
        <Route path="ofertas" element={<PaginaPendiente titulo="Ofertas" />} />
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="nosotros" element={<SobreNosotros />} />
        <Route path="contacto" element={<Contacto />} />
        
        {/* BLOGS (Tus páginas migradas) */}
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<DetalleBlog />} />

        {/* Acceso (Componentes reales de tu compañero) */}
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        {/* Compra */}
        <Route path="carrito" element={<PaginaPendiente titulo="Carrito" />} />
        <Route path="checkout" element={<PaginaPendiente titulo="Datos de compra" />} />
        <Route path="compra/exitosa" element={<PaginaPendiente titulo="Compra exitosa" />} />
        <Route path="compra/error" element={<PaginaPendiente titulo="Compra fallida" />} />
      </Route>

      {/* 2. Rutas de Administración (Aisladas con AdminLayout) */}
      <Route element={<AdminLayout />}>
        <Route path="admin" element={<PaginaPendiente titulo="Panel de administración" />} />
        <Route path="admin/productos" element={<PaginaPendiente titulo="Administrar productos" />} />
        <Route path="admin/productos/nuevo" element={<PaginaPendiente titulo="Nuevo producto" />} />
        <Route path="admin/productos/stock-bajo" element={<PaginaPendiente titulo="Productos con pocas unidades" />} />
        <Route path="admin/productos/:codigo" element={<PaginaPendiente titulo="Consultar producto" />} />
        <Route path="admin/productos/:codigo/editar" element={<PaginaPendiente titulo="Editar producto" />} />

        <Route path="admin/categorias" element={<PaginaPendiente titulo="Administrar categorías" />} />
        <Route path="admin/categorias/nueva" element={<PaginaPendiente titulo="Nueva categoría" />} />
        <Route path="admin/categorias/:id/editar" element={<PaginaPendiente titulo="Editar categoría" />} />
        <Route path="admin/usuarios" element={<AdminUsuarios />} />
        <Route path="admin/usuarios/nuevo" element={<NuevoUsuario />} />
        <Route path="admin/usuarios/:id" element={<AdminUsuarios />} />
        <Route path="admin/usuarios/:id/editar" element={<EditarUsuario />} />
        <Route path="admin/usuarios/:id/compras" element={<AdminUsuarios />} />

        <Route path="admin/pedidos" element={<PaginaPendiente titulo="Pedidos" />} />
        <Route path="admin/pedidos/:id" element={<PaginaPendiente titulo="Detalle del pedido" />} />
        <Route path="admin/reportes" element={<PaginaPendiente titulo="Reportes" />} />
        <Route path="admin/perfil" element={<PaginaPendiente titulo="Perfil" />} />
      </Route>

      {/* Página 404 */}
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default App;