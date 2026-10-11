
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from '../pages/Contacto';

describe('Formulario de contacto', () => {
  let enviarSpy;

  beforeEach(() => {
    localStorage.removeItem('contactos');
    enviarSpy = jasmine.createSpy('enviarContacto');
  });

  afterEach(() => {
    localStorage.removeItem('contactos');
  });

  const completarFormulario = (
    nombre = 'Ana Pérez',
    correo = 'ana@gmail.com',
    mensaje = 'Consulta sobre instrumentos'
  ) => {
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

  it('debe mostrar errores cuando los campos están vacíos', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    enviarFormulario();

    expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
    expect(screen.getByText('El correo es obligatorio')).toBeTruthy();
    expect(screen.getByText('El comentario es obligatorio')).toBeTruthy();
    expect(enviarSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem('contactos')).toBeNull();
  });

  it('no debe enviar ni guardar un correo inválido', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario(
      'Ana Pérez',
      'ana@invalido.com',
      'Consulta'
    );

    enviarFormulario();

    expect(screen.getByText('Ingresa un correo válido')).toBeTruthy();
    expect(enviarSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem('contactos')).toBeNull();
  });

  it('debe llamar al spy con datos válidos', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario();

    enviarFormulario();

    expect(enviarSpy).toHaveBeenCalledTimes(1);
    expect(enviarSpy).toHaveBeenCalledWith({
      nombre: 'Ana Pérez',
      correo: 'ana@gmail.com',
      mensaje: 'Consulta sobre instrumentos'
    });
  });

  it('debe aceptar correos institucionales', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario(
      'Ana Pérez',
      'ana@profesor.duoc.cl',
      'Consulta académica'
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

  it('debe guardar los datos válidos en localStorage', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario();

    enviarFormulario();

    const contactos = JSON.parse(
      localStorage.getItem('contactos')
    );

    expect(contactos.length).toBe(1);
    expect(contactos[0].nombre).toBe('Ana Pérez');
    expect(contactos[0].correo).toBe('ana@gmail.com');
    expect(contactos[0].mensaje).toBe('Consulta sobre instrumentos');
    expect(contactos[0].fecha).toBeTruthy();
    expect(enviarSpy).toHaveBeenCalledTimes(1);
  });

  it('debe limpiar los campos después de guardar', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario();

    enviarFormulario();

    expect(screen.getByLabelText(/NOMBRE COMPLETO/i).value).toBe('');
    expect(screen.getByLabelText(/CORREO/i).value).toBe('');
    expect(screen.getByLabelText(/COMENTARIO/i).value).toBe('');
    expect(screen.getByText('0 / 500 caracteres')).toBeTruthy();
    expect(
      screen.getByText('Mensaje guardado correctamente')
    ).toBeTruthy();
  });

  it('debe conservar los mensajes anteriores', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario();
    enviarFormulario();

    completarFormulario(
      'Carlos Soto',
      'carlos@duoc.cl',
      'Segunda consulta'
    );
    enviarFormulario();

    const contactos = JSON.parse(
      localStorage.getItem('contactos')
    );

    expect(contactos.length).toBe(2);
    expect(contactos[0].nombre).toBe('Ana Pérez');
    expect(contactos[1].nombre).toBe('Carlos Soto');
    expect(enviarSpy).toHaveBeenCalledTimes(2);
  });

  it('no debe guardar ni limpiar el formulario inválido', () => {
    render(<Contacto onEnviar={enviarSpy} />);

    completarFormulario(
      'Ana Pérez',
      'correo-incorrecto',
      'Mi consulta'
    );

    enviarFormulario();

    expect(enviarSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem('contactos')).toBeNull();
    expect(screen.getByLabelText(/NOMBRE COMPLETO/i).value)
      .toBe('Ana Pérez');
    expect(screen.getByLabelText(/COMENTARIO/i).value)
      .toBe('Mi consulta');
  });
});
