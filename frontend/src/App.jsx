import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PaginaPendiente from './pages/PaginaPendiente.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import SobreNosotros from './pages/SobreNosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import Contacto from './pages/Contacto.jsx';
import { DetalleBlog } from './pages/DetalleBlog'; // <- Ya tenías el import listo
import './assets/styles.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Tienda */}
        <Route index element={<PaginaPendiente titulo="Inicio" />} />
        <Route path="productos" element={<PaginaPendiente titulo="Productos" />} />
        <Route path="productos/:codigo" element={<PaginaPendiente titulo="Detalle de producto" />} />
        <Route path="categorias" element={<PaginaPendiente titulo="Categorías" />} />
        <Route path="categorias/:id" element={<PaginaPendiente titulo="Productos de la categoría" />} />
        <Route path="ofertas" element={<PaginaPendiente titulo="Ofertas" />} />
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="nosotros" element={<SobreNosotros />} />
        <Route path="contacto" element={<Contacto />} />
        
        {/* BLOGS */}
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<DetalleBlog />} />

        {/* Acceso */}
        <Route path="login" element={<PaginaPendiente titulo="Iniciar sesión" />} />
        <Route path="registro" element={<PaginaPendiente titulo="Registro" />} />

        {/* Compra */}
        <Route path="carrito" element={<PaginaPendiente titulo="Carrito" />} />
        <Route path="checkout" element={<PaginaPendiente titulo="Datos de compra" />} />
        <Route path="compra/exitosa" element={<PaginaPendiente titulo="Compra exitosa" />} />
        <Route path="compra/error" element={<PaginaPendiente titulo="Compra fallida" />} />

        {/* Administración de productos */}
        <Route path="admin" element={<PaginaPendiente titulo="Panel de administración" />} />
        <Route path="admin/productos" element={<PaginaPendiente titulo="Administrar productos" />} />
        <Route path="admin/productos/nuevo" element={<PaginaPendiente titulo="Nuevo producto" />} />
        <Route path="admin/productos/stock-bajo" element={<PaginaPendiente titulo="Productos con pocas unidades" />} />
        <Route path="admin/productos/:codigo" element={<PaginaPendiente titulo="Consultar producto" />} />
        <Route path="admin/productos/:codigo/editar" element={<PaginaPendiente titulo="Editar producto" />} />

        {/* Administración de categorías */}
        <Route path="admin/categorias" element={<PaginaPendiente titulo="Administrar categorías" />} />
        <Route path="admin/categorias/nueva" element={<PaginaPendiente titulo="Nueva categoría" />} />
        <Route path="admin/categorias/:id/editar" element={<PaginaPendiente titulo="Editar categoría" />} />

        {/* Administración de usuarios */}
        <Route path="admin/usuarios" element={<PaginaPendiente titulo="Administrar usuarios" />} />
        <Route path="admin/usuarios/nuevo" element={<PaginaPendiente titulo="Nuevo usuario" />} />
        <Route path="admin/usuarios/:id" element={<PaginaPendiente titulo="Consultar usuario" />} />
        <Route path="admin/usuarios/:id/editar" element={<PaginaPendiente titulo="Editar usuario" />} />
        <Route path="admin/usuarios/:id/compras" element={<PaginaPendiente titulo="Historial de compras" />} />

        {/* Pedidos y reportes */}
        <Route path="admin/pedidos" element={<PaginaPendiente titulo="Pedidos" />} />
        <Route path="admin/pedidos/:id" element={<PaginaPendiente titulo="Detalle del pedido" />} />
        <Route path="admin/reportes" element={<PaginaPendiente titulo="Reportes" />} />
        <Route path="admin/perfil" element={<PaginaPendiente titulo="Perfil" />} />

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;