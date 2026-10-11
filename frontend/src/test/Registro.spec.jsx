import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../pages/Registro';

describe('Registro', () => {
  const completarFormulario = (contrasena, confirmar) => {
    fireEvent.change(screen.getByLabelText(/RUN/i), {
      target: { value: '12345678-5' }
    });
    fireEvent.change(screen.getByLabelText(/NOMBRE COMPLETO/i), {
      target: { value: 'Ana Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/^CORREO/i), {
      target: { value: 'ana@gmail.com' }
    });
    fireEvent.change(screen.getByLabelText(/DIRECCIÓN/i), {
      target: { value: 'Av. Siempre Viva 123' }
    });
    fireEvent.change(screen.getByLabelText(/^CONTRASEÑA/i), {
      target: { value: contrasena }
    });
    fireEvent.change(screen.getByLabelText(/CONFIRMAR CONTRASEÑA/i), {
      target: { value: confirmar }
    });
  };

  const enviar = () => {
    fireEvent.click(screen.getByRole('button', { name: /CREAR CUENTA/i }));
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );
  });

  it('debe mostrar los campos del formulario', () => {
    expect(screen.getByLabelText(/RUN/i)).toBeTruthy();
    expect(screen.getByLabelText(/^CONTRASEÑA/i)).toBeTruthy();
    expect(screen.getByLabelText(/CONFIRMAR CONTRASEÑA/i)).toBeTruthy();
  });

  it('debe mostrar error si las contraseñas no coinciden', () => {
    completarFormulario('clave12345', 'otraClave123');
    enviar();

    expect(screen.getByRole('alert').textContent)
      .toBe('Las contraseñas no coinciden');
  });

  it('debe mostrar error si la contraseña tiene menos de 8 caracteres', () => {
    completarFormulario('abc123', 'abc123');
    enviar();

    expect(screen.getByRole('alert').textContent)
      .toBe('La contraseña debe tener al menos 8 caracteres');
  });
});