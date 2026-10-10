import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Componente Home (Pruebas)', function() {

  it('renderiza el banner principal y el botón de productos', function() {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que aparezca el título principal del banner
    const tituloHero = screen.getByText(/SONIDO VIVO/i);
    expect(tituloHero).toBeDefined();

    // Verifica que el botón para ver productos esté presente
    const botonHero = screen.getByText(/ver productos/i);
    expect(botonHero).toBeDefined();
  });

  it('muestra las tarjetas de productos destacados con sus enlaces', function() {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que al menos uno de los productos destacados aparezca en la vista
    const productoFender = screen.getByText(/Guitarra Eléctrica Fender/i);
    expect(productoFender).toBeDefined();

    const productoRoland = screen.getByText(/Batería Electrónica Roland/i);
    expect(productoRoland).toBeDefined();
  });

});