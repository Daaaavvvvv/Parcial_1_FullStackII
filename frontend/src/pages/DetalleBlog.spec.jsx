import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DetalleBlog } from './DetalleBlog';

describe('Componente DetalleBlog (Pruebas)', function() {

  it('renderiza correctamente el contenido del blog cuando el ID existe', function() {
    render(
      <MemoryRouter initialEntries={['/blogs/1']}>
        <Routes>
          <Route path="/blogs/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que aparezca el título del blog con ID 1
    const tituloBlog = screen.getByText(/Los instrumentos detrás de las leyendas/i);
    expect(tituloBlog).toBeDefined();

    // Verifica que aparezca el autor correspondiente
    const autorBlog = screen.getByText(/Por Sonido Vivo/i);
    expect(autorBlog).toBeDefined();
  });

  it('muestra un mensaje de error si el artículo del blog no existe', function() {
    render(
      <MemoryRouter initialEntries={['/blogs/999']}>
        <Routes>
          <Route path="/blogs/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que se muestre el aviso de que el artículo no existe
    const mensajeError = screen.getByText(/El artículo solicitado no existe/i);
    expect(mensajeError).toBeDefined();

    // Verifica que exista el botón para volver
    const botonVolver = screen.getByText(/← Volver al Blog/i);
    expect(botonVolver).toBeDefined();
  });

});