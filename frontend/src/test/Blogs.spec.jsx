import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blogs from '../pages/Blogs';

describe('Componente Blogs (Pruebas)', function() {

  it('renderiza el título principal de noticias', function() {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    const tituloPrincipal = screen.getByText(/Noticias Importantes/i);
    expect(tituloPrincipal).toBeDefined();
  });

  it('muestra los artículos del blog correctamente', function() {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    const tituloBlog = screen.getByText(/Los instrumentos detrás de las leyendas/i);
    expect(tituloBlog).toBeDefined();
  });

  it('contiene los botones de enlace para leer los artículos', function() {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    const botonesLeer = screen.getAllByText(/LEER ARTÍCULO/i);
    expect(botonesLeer.length).toBeGreaterThan(0);
  });

});