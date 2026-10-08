import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PaginaPendiente from './pages/PaginaPendiente.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import SobreNosotros from './pages/SobreNosotros.jsx';
import './assets/styles.css';

function App() {
  return (
    <Routes>
      {/* 1. Rutas de la Tienda (usan el Layout con Navbar, Fondo y Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<PaginaPendiente titulo="Inicio" />} />
        <Route path="/productos" element={<PaginaPendiente titulo="Productos" />} />
        <Route path="/productos/:codigo" element={<PaginaPendiente titulo="Detalle de producto" />} />
        <Route path="/categorias" element={<PaginaPendiente titulo="Categorías" />} />
        <Route path="/categorias/:id" element={<PaginaPendiente titulo="Productos de la categoría" />} />
        <Route path="/ofertas" element={<PaginaPendiente titulo="Ofertas" />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<PaginaPendiente titulo="Contacto" />} />
        <Route path="/blogs" element={<PaginaPendiente titulo="Blogs" />} />
        <Route path="/blogs/:id" element={<PaginaPendiente titulo="Detalle del blog" />} />

        {/* Acceso y Carrito */}
        <Route path="/login" element={<PaginaPendiente titulo="Iniciar sesión" />} />
        <Route path="/registro" element={<PaginaPendiente titulo="Registro" />} />
        <Route path="/carrito" element={<PaginaPendiente titulo="Carrito" />} />
        <Route path="/checkout" element={<PaginaPendiente titulo="Datos de compra" />} />
        <Route path="/compra/exitosa" element={<PaginaPendiente titulo="Compra exitosa" />} />
        <Route path="/compra/error" element={<PaginaPendiente titulo="Compra fallida" />} />
      </Route>

      {/* 2. Rutas de Administración (aisladas sin el Layout de cliente) */}
      <Route path="/admin" element={<PaginaPendiente titulo="Panel de administración" />} />
      <Route path="/admin/productos" element={<PaginaPendiente titulo="Administrar productos" />} />
      <Route path="/admin/productos/nuevo" element={<PaginaPendiente titulo="Nuevo producto" />} />
      <Route path="/admin/productos/stock-bajo" element={<PaginaPendiente titulo="Productos con pocas unidades" />} />
      <Route path="/admin/productos/:codigo" element={<PaginaPendiente titulo="Consultar producto" />} />
      <Route path="/admin/productos/:codigo/editar" element={<PaginaPendiente titulo="Editar producto" />} />

      <Route path="/admin/categorias" element={<PaginaPendiente titulo="Administrar categorías" />} />
      <Route path="/admin/categorias/nueva" element={<PaginaPendiente titulo="Nueva categoría" />} />
      <Route path="/admin/categorias/:id/editar" element={<PaginaPendiente titulo="Editar categoría" />} />

      <Route path="/admin/usuarios" element={<PaginaPendiente titulo="Administrar usuarios" />} />
      <Route path="/admin/usuarios/nuevo" element={<PaginaPendiente titulo="Nuevo usuario" />} />
      <Route path="/admin/usuarios/:id" element={<PaginaPendiente titulo="Consultar usuario" />} />
      <Route path="/admin/usuarios/:id/editar" element={<PaginaPendiente titulo="Editar usuario" />} />
      <Route path="/admin/usuarios/:id/compras" element={<PaginaPendiente titulo="Historial de compras" />} />

      <Route path="/admin/pedidos" element={<PaginaPendiente titulo="Pedidos" />} />
      <Route path="/admin/pedidos/:id" element={<PaginaPendiente titulo="Detalle del pedido" />} />
      <Route path="/admin/reportes" element={<PaginaPendiente titulo="Reportes" />} />
      <Route path="/admin/perfil" element={<PaginaPendiente titulo="Perfil" />} />

      {/* Página 404 */}
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default App;