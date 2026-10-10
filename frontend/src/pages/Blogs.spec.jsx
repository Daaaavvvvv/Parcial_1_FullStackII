import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blogs from './Blogs';

describe('Componente Blogs (Pruebas)', function() {

  it('renderiza el título principal de noticias', function() {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Verifica que el encabezado principal exista
    const tituloPrincipal = screen.getByText(/Noticias Importantes/i);
    expect(tituloPrincipal).toBeDefined();
  });

  it('muestra los artículos del blog correctamente', function() {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Verifica que aparezca el título de uno de los artículos de tu lista
    const tituloBlog = screen.getByText(/Los instrumentos detrás de las leyendas/i);
    expect(tituloBlog).toBeDefined();
  });

  it('contiene los botones de enlace para leer los artículos', function() {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Verifica que los botones "LEER ARTÍCULO" estén presentes en pantalla
    const botonesLeer = screen.getAllByText(/LEER ARTÍCULO/i);
    expect(botonesLeer.length).toBeGreaterThan(0);
  });

});