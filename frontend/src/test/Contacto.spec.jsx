
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from '../pages/Contacto';

describe('Formulario de contacto', () => {
  let enviarSpy;

  beforeEach(() => {
    enviarSpy = jasmine.createSpy('enviarContacto');
  });

  const completarFormulario = (nombre, correo, mensaje) => {
    fireEvent.change(screen.getByLabelText(/NOMBRE COMPLETO/i), {
      target: { value: nombre }
    });

    fireEvent.change(screen.getByLabelText(/CORREO/i), {
      target: { value: correo }
    });

    fireEvent.change(screen.getByLabelText(/COMENTARIO/i), {
      target: { value: mensaje }
    });
  };

  const enviarFormulario = () => {
    fireEvent.click(
      screen.getByRole('button', { name: /ENVIAR MENSAJE/i })
    );
  };

  it('debe mostrar los campos del formulario', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    expect(screen.getByLabelText(/NOMBRE COMPLETO/i)).toBeTruthy();
    expect(screen.getByLabelText(/CORREO/i)).toBeTruthy();
    expect(screen.getByLabelText(/COMENTARIO/i)).toBeTruthy();
  });

  it('debe mostrar errores si los campos están vacíos', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    enviarFormulario();

    expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
    expect(screen.getByText('El correo es obligatorio')).toBeTruthy();
    expect(screen.getByText('El comentario es obligatorio')).toBeTruthy();
    expect(enviarSpy).not.toHaveBeenCalled();
  });

  it('no debe enviar si el correo es inválido', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario('Ana Pérez', 'correo@invalido.com', 'Hola');

    enviarFormulario();

    expect(screen.getByText('Ingresa un correo válido')).toBeTruthy();
    expect(enviarSpy).not.toHaveBeenCalled();
  });

  it('debe enviar correctamente los datos válidos', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario(
      'Ana Pérez',
      'ana@gmail.com',
      'Quiero consultar por un producto'
    );

    enviarFormulario();

    expect(enviarSpy).toHaveBeenCalledTimes(1);

    expect(enviarSpy).toHaveBeenCalledWith({
      nombre: 'Ana Pérez',
      correo: 'ana@gmail.com',
      mensaje: 'Quiero consultar por un producto'
    });
  });

  it('debe aceptar un correo institucional válido', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario(
      'Ana Pérez',
      'ana@duoc.cl',
      'Consulta de instrumentos'
    );

    enviarFormulario();

    expect(enviarSpy).toHaveBeenCalledTimes(1);
  });

  it('debe actualizar el contador de caracteres', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    fireEvent.change(screen.getByLabelText(/COMENTARIO/i), {
      target: { value: 'Hola mundo' }
    });

    expect(screen.getByText('10 / 500 caracteres')).toBeTruthy();
  });
});