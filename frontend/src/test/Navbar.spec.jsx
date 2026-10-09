
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {

  // PRUEBA 1: Comprobar los enlaces
  it('debe mostrar los enlaces con sus rutas correctas', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href'))
      .toBe('/');

    expect(screen.getByRole('link', { name: 'Productos' }).getAttribute('href'))
      .toBe('/productos');

    expect(screen.getByRole('link', { name: 'Nosotros' }).getAttribute('href'))
      .toBe('/sobre-nosotros');

    expect(screen.getByRole('link', { name: 'Blogs' }).getAttribute('href'))
      .toBe('/blogs');

    expect(screen.getByRole('link', { name: 'Contacto' }).getAttribute('href'))
      .toBe('/contacto');
  });

  // PRUEBA 2: Comprobar apertura y cierre del menú
  it('debe abrir y cerrar el menú al hacer clic', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const botonMenu = screen.getByRole('button', { name: '☰' });
    const menu = container.querySelector('nav');

    // Comprobar que comienza cerrado
    expect(menu.classList.contains('activo')).toBe(false);

    // Abrir el menú
    fireEvent.click(botonMenu);
    expect(menu.classList.contains('activo')).toBe(true);

    // Cerrar el menú
    fireEvent.click(botonMenu);
    expect(menu.classList.contains('activo')).toBe(false);
  });

});
