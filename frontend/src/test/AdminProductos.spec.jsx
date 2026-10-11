import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminProductos from '../pages/AdminProductos';
import {
  consultarProductos,
  eliminarProducto,
  obtenerProducto
} from '../services/productoService.js';

describe('Administración de productos', () => {
  const mostrar = () =>
    render(
      <MemoryRouter>
        <AdminProductos />
      </MemoryRouter>
    );

  beforeEach(() => {
    localStorage.removeItem('productos');
  });

  afterEach(() => {
    localStorage.removeItem('productos');
  });

  it('debe mostrar los productos del catálogo', () => {
    mostrar();

    expect(screen.getByText('GT001')).toBeTruthy();
    expect(screen.getByText('Guitarra Eléctrica Fender')).toBeTruthy();
    expect(screen.getByText('$249.990')).toBeTruthy();
    expect(screen.getAllByRole('button', { name: 'Eliminar' }).length).toBe(5);
  });

  it('debe mostrar un mensaje cuando no hay productos', () => {
    localStorage.setItem('productos', '[]');
    mostrar();

    expect(screen.getByText('No hay productos registrados.')).toBeTruthy();
  });

  it('debe tener enlaces para agregar, ver stock bajo y administrar categorías', () => {
    mostrar();

    expect(screen.getByRole('link', { name: /Nuevo Producto/i }).getAttribute('href'))
      .toBe('/admin/productos/nuevo');
    expect(screen.getByRole('link', { name: /pocas unidades/i }).getAttribute('href'))
      .toBe('/admin/productos/stock-bajo');
    expect(screen.getByRole('link', { name: /categorías/i }).getAttribute('href'))
      .toBe('/admin/categorias');
  });

  it('debe enlazar a la edición del producto correcto', () => {
    mostrar();

    const enlaces = screen.getAllByRole('link', { name: 'Editar' });

    expect(enlaces[0].getAttribute('href')).toBe('/admin/productos/GT001/editar');
  });

  it('debe pedir confirmación y conservar el producto si se cancela', () => {
    const confirmarSpy = spyOn(window, 'confirm').and.returnValue(false);
    mostrar();

    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

    expect(confirmarSpy).toHaveBeenCalledTimes(1);
    expect(obtenerProducto('GT001').nombre).toBe('Guitarra Acústica Yamaha');
    expect(consultarProductos().length).toBe(5);
    expect(screen.getByText('GT001')).toBeTruthy();
  });

  it('debe eliminar el producto cuando se confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mostrar();

    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

    expect(obtenerProducto('GT001')).toBeUndefined();
    expect(screen.queryByText('GT001')).toBeNull();
    expect(consultarProductos().length).toBe(4);
  });

  it('debe mostrar un error si el producto ya no existe', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mostrar();
    eliminarProducto('GT001');

    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

    expect(screen.getByRole('alert').textContent).toMatch(/No existe el producto/);
  });

  it('debe mostrar y cerrar el detalle de un producto', () => {
    mostrar();

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver' })[1]);

    const detalle = screen.getByLabelText('Detalle del producto');
    expect(detalle.textContent).toMatch(/GT002/);
    expect(detalle.textContent).toMatch(/Sin definir/);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(screen.queryByLabelText('Detalle del producto')).toBeNull();
  });

  it('debe mostrar sin descripción ni imagen cuando faltan', () => {
    localStorage.setItem('productos', JSON.stringify([
      { codigo: 'MC001', nombre: 'Micrófono', descripcion: '', precio: 1000, stock: 2, stockCritico: 1, categoria: 'Micrófonos', imagen: '' }
    ]));
    mostrar();

    fireEvent.click(screen.getByRole('button', { name: 'Ver' }));

    const detalle = screen.getByLabelText('Detalle del producto');
    expect(detalle.textContent).toMatch(/Sin descripción/);
    expect(detalle.textContent).toMatch(/Sin imagen/);
  });

  it('debe abrir el detalle cuando la ruta trae el código', () => {
    render(
      <MemoryRouter initialEntries={['/admin/productos/gt002']}>
        <Routes>
          <Route path="/admin/productos/:codigo" element={<AdminProductos />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Detalle del producto').textContent)
      .toMatch(/Guitarra Eléctrica Fender/);
  });
});