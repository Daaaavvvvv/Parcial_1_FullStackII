import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';

describe('ProductoCard', () => {
  const producto = {
    codigo: 'GT001',
    nombre: 'Guitarra Acústica Yamaha',
    precio: 89990,
    stock: 12,
    imagen: '/img/gt001.jpg',
  };

  let agregarSpy;

  const mostrar = (datos = producto) =>
    render(
      <MemoryRouter>
        <ProductoCard producto={datos} onAgregar={agregarSpy} />
      </MemoryRouter>
    );
  beforeEach(() => {
    agregarSpy = jasmine.createSpy('onAgregar');
  });

  it('debe mostrar imagen, nombre, precio y stock del producto', () => {
    mostrar();

    expect(screen.getByRole('img', { name: producto.nombre }).getAttribute('src'))
      .toBe('/img/gt001.jpg');
    expect(screen.getByRole('heading', { name: producto.nombre })).toBeTruthy();
    expect(screen.getByText(`$${producto.precio.toLocaleString('es-CL')}`)).toBeTruthy();
    expect(screen.getByText('Stock: 12')).toBeTruthy();
  });

  it('debe enlazar al detalle del producto', () => {
    const { container } = mostrar();

    const enlaces = container.querySelectorAll('a');
    expect(enlaces.length).toBe(2);
    enlaces.forEach((enlace) => {
      expect(enlace.getAttribute('href')).toBe('/productos/GT001');
    });
  });
  it('debe entregar el código correcto al agregar al carrito', () => {
    mostrar();

    fireEvent.click(screen.getByRole('button', { name: /Añadir al carrito/i }));

    expect(agregarSpy).toHaveBeenCalledTimes(1);
    expect(agregarSpy).toHaveBeenCalledWith('GT001');
  });

  it('debe desactivar el botón cuando no quedan unidades', () => {
    mostrar({ ...producto, stock: 0 });

    const boton = screen.getByRole('button', { name: /Sin stock/i });
    expect(boton.disabled).toBe(true);

    fireEvent.click(boton);
    expect(agregarSpy).not.toHaveBeenCalled();
  });
});