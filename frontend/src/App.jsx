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
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import Checkout from './pages/Checkout.jsx';
import CompraExitosa from './pages/CompraExitosa.jsx';
import CompraError from './pages/CompraError.jsx';

import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';

import AdminUsuarios from './pages/AdminUsuarios.jsx';
import NuevoUsuario from './pages/NuevoUsuario.jsx';
import EditarUsuario from './pages/EditarUsuario.jsx';

import AdminProductos from './pages/AdminProductos.jsx';
import NuevoProducto from './pages/NuevoProducto.jsx';
import EditarProducto from './pages/EditarProducto.jsx';
import AdminStockBajo from './pages/AdminStockBajo.jsx';
import AdminCategorias from './pages/AdminCategorias.jsx';

import AdminPedidos from './pages/AdminPedidos.jsx';
import AdminDetallePedido from './pages/AdminDetallePedido.jsx';
import AdminReportes from './pages/AdminReportes.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import './assets/styles.css';

function App() {
  return (
    <Routes>
      {/* 1. Rutas de la tienda */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="productos" element={<Productos />} />
        <Route path="productos/:codigo" element={<DetalleProducto />} />

        <Route
          path="categorias"
          element={<PaginaPendiente titulo="Categorías" />}
        />
        <Route
          path="categorias/:id"
          element={<PaginaPendiente titulo="Productos de la categoría" />}
        />
        <Route
          path="ofertas"
          element={<PaginaPendiente titulo="Ofertas" />}
        />

        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="nosotros" element={<SobreNosotros />} />
        <Route path="contacto" element={<Contacto />} />

        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<DetalleBlog />} />

        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="compra/exitosa" element={<CompraExitosa />} />
        <Route path="compra/error" element={<CompraError />} />
      </Route>

      {/* 2. Rutas de administración */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={<AdminDashboard />} 
        />

        {/* Productos */}
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<NuevoProducto />} />
        <Route path="productos/stock-bajo" element={<AdminStockBajo />} />
        <Route path="productos/:codigo" element={<EditarProducto />} />
        <Route path="productos/:codigo/editar" element={<EditarProducto />} />

        {/* Categorías */}
        <Route path="categorias" element={<AdminCategorias />} />
        <Route
          path="categorias/nueva"
          element={<PaginaPendiente titulo="Nueva categoría" />}
        />
        <Route
          path="categorias/:id/editar"
          element={<PaginaPendiente titulo="Editar categoría" />}
        />

        {/* Usuarios */}
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
        <Route path="usuarios/:id" element={<EditarUsuario />} />
        <Route path="usuarios/:id/editar" element={<EditarUsuario />} />
        <Route
          path="usuarios/:id/compras"
          element={<AdminUsuarios />}
        />

        {/* Pedidos y reportes - Issue #32 */}
        <Route path="pedidos" element={<AdminPedidos />} />
        <Route path="pedidos/:id" element={<AdminDetallePedido />} />
        <Route path="reportes" element={<AdminReportes />} />

        {/* Perfil */}
        <Route
          path="perfil"
          element={<PaginaPendiente titulo="Perfil" />}
        />
      </Route>

      {/* 3. Página 404 */}
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default App;