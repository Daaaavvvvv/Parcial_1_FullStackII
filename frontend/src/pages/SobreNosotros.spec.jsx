import React from 'react';
import { render, screen } from '@testing-library/react';
import SobreNosotros from './SobreNosotros';

describe('SobreNosotros Component', () => {
  it('debe renderizar el título principal correctamente', () => {
    render(<SobreNosotros />);
    expect(screen.getByText('Sobre Sonido Vivo')).toBeTruthy();
  });

  it('debe mostrar la lista de desarrolladores', () => {
    render(<SobreNosotros />);
    expect(screen.getByText('Vanessa Roberson')).toBeTruthy();
    expect(screen.getByText('David Navarrete')).toBeTruthy();
    expect(screen.getByText('Isaac Manzor')).toBeTruthy();
  });
});