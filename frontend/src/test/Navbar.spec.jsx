
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('debe mostrar los enlaces con sus rutas correctas', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', { name: 'Home' }).getAttribute('href')
    ).toBe('/');

    expect(
      screen.getByRole('link', { name: 'Productos' }).getAttribute('href')
    ).toBe('/productos');

    expect(
      screen.getByRole('link', { name: 'Nosotros' }).getAttribute('href')
    ).toBe('/sobre-nosotros');

    expect(
      screen.getByRole('link', { name: 'Blogs' }).getAttribute('href')
    ).toBe('/blogs');

    expect(
      screen.getByRole('link', { name: 'Contacto' }).getAttribute('href')
    ).toBe('/contacto');
  });

  it('debe abrir y cerrar el menú al hacer clic', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const botonMenu = screen.getByRole('button', {
      name: /abrir o cerrar menú/i,
    });

    const menu = container.querySelector('nav');

    expect(menu.classList.contains('activo')).toBe(false);

    fireEvent.click(botonMenu);
    expect(menu.classList.contains('activo')).toBe(true);

    fireEvent.click(botonMenu);
    expect(menu.classList.contains('activo')).toBe(false);
  });
});
