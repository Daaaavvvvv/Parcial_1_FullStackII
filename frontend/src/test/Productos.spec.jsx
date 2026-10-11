import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../pages/Productos';
import { productosIniciales } from '../data/productos.js';
import { editarProducto } from '../services/productoService.js';

describe('Página Productos', () => {
  const mostrar = () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );
  };

  const botonesAgregar = () =>
    screen.getAllByRole('button', { name: /Añadir al carrito/i });

  beforeEach(() => {
    localStorage.removeItem('productos');
    localStorage.removeItem('carrito');
  });

  afterEach(() => {
    localStorage.removeItem('productos');
    localStorage.removeItem('carrito');
  });

  it('debe mostrar el título y una tarjeta por cada producto', () => {
    mostrar();

    expect(screen.getByRole('heading', { name: /Catálogo de Productos/i })).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 3 }).length)
      .toBe(productosIniciales.length);
  });

  it('debe agregar al carrito el producto correcto y avisar', () => {
    mostrar();

    fireEvent.click(botonesAgregar()[0]);

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    expect(carrito.length).toBe(1);
    expect(carrito[0].codigo).toBe('GT001');
    expect(carrito[0].cantidad).toBe(1);
    expect(screen.getByRole('status').textContent)
      .toBe('Producto agregado al carrito correctamente');
  });

  it('debe desactivar el botón de un producto sin stock', () => {
    editarProducto('GT001', { stock: 0 });
    mostrar();

    expect(screen.getByRole('button', { name: /Sin stock/i }).disabled).toBe(true);
    expect(botonesAgregar().length).toBe(productosIniciales.length - 1);
  });

  it('debe mostrar un error si ya no quedan unidades para agregar', () => {
    editarProducto('GT002', { stock: 1 });
    mostrar();

    fireEvent.click(botonesAgregar()[1]);
    fireEvent.click(botonesAgregar()[1]);

    expect(screen.getByRole('alert').textContent)
      .toMatch(/No quedan más unidades/);
    expect(JSON.parse(localStorage.getItem('carrito'))[0].cantidad).toBe(1);
  });

  it('debe avisar cuando no hay productos', () => {
    localStorage.setItem('productos', '[]');
    mostrar();

    expect(screen.getByText('No hay productos disponibles')).toBeTruthy();
  });
});