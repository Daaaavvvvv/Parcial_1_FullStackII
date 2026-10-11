import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NuevoProducto from '../pages/NuevoProducto';
import EditarProducto from '../pages/EditarProducto';
import { obtenerProducto } from '../services/productoService.js';

describe('Páginas Nuevo y Editar producto', () => {
  const mostrarNuevo = () =>
    render(
      <MemoryRouter initialEntries={['/admin/productos/nuevo']}>
        <Routes>
          <Route path="/admin/productos/nuevo" element={<NuevoProducto />} />
          <Route path="/admin/productos" element={<p>Lista de productos</p>} />
        </Routes>
      </MemoryRouter>
    );

  const mostrarEditar = (codigo) =>
    render(
      <MemoryRouter initialEntries={[`/admin/productos/${codigo}/editar`]}>
        <Routes>
          <Route path="/admin/productos/:codigo/editar" element={<EditarProducto />} />
          <Route path="/admin/productos" element={<p>Lista de productos</p>} />
        </Routes>
      </MemoryRouter>
    );

  const escribir = (etiqueta, valor) => {
    fireEvent.change(screen.getByLabelText(etiqueta), {
      target: { value: valor }
    });
  };

  const completarNuevo = (codigo) => {
    escribir(/^Código/, codigo);
    escribir(/^Nombre/, 'Micrófono Shure');
    escribir(/^Precio/, '99990');
    escribir(/^Stock \*/, '4');
    escribir(/^Categoría/, 'Baterías');
  };

  beforeEach(() => {
    localStorage.removeItem('productos');
  });

  afterEach(() => {
    localStorage.removeItem('productos');
  });

  it('debe guardar un producto nuevo y volver a la lista', () => {
    mostrarNuevo();
    completarNuevo('mc001');

    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));

    expect(obtenerProducto('MC001').nombre).toBe('Micrófono Shure');
    expect(screen.getByText('Lista de productos')).toBeTruthy();
  });

  it('debe mostrar el error si el código ya existe', () => {
    mostrarNuevo();
    completarNuevo('gt001');

    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));

    expect(screen.getByRole('alert').textContent)
      .toBe('Ya existe un producto con el código GT001');
    expect(screen.queryByText('Lista de productos')).toBeNull();
  });

  it('debe volver a la lista al cancelar un producto nuevo', () => {
    mostrarNuevo();

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.getByText('Lista de productos')).toBeTruthy();
  });

  it('debe mostrar los datos actuales del producto al editar', () => {
    mostrarEditar('GT001');

    expect(screen.getByRole('heading', { name: 'Editar Producto' })).toBeTruthy();
    expect(screen.getByLabelText(/^Nombre/).value).toBe('Guitarra Acústica Yamaha');
    expect(screen.getByLabelText(/^Código/).readOnly).toBe(true);
  });

  it('debe guardar los cambios y reflejarlos en el catálogo', () => {
    mostrarEditar('GT001');
    escribir(/^Precio/, '79990');
    escribir(/^Stock \*/, '20');

    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(obtenerProducto('GT001').precio).toBe(79990);
    expect(obtenerProducto('GT001').stock).toBe(20);
    expect(screen.getByText('Lista de productos')).toBeTruthy();
  });

  it('debe mostrar el error del servicio si el stock crítico es inválido', () => {
    mostrarEditar('GT001');
    escribir(/^Stock crítico/, '-3');

    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(screen.getByRole('alert').textContent).toMatch(/stock crítico/);
    expect(obtenerProducto('GT001').stockCritico).toBeNull();
  });

  it('debe volver a la lista al cancelar la edición', () => {
    mostrarEditar('GT001');

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.getByText('Lista de productos')).toBeTruthy();
  });

  it('debe avisar cuando el producto no existe', () => {
    mostrarEditar('XX999');

    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));
    expect(screen.getByText('Lista de productos')).toBeTruthy();
  });
});