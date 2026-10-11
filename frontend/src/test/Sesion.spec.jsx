
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../pages/Registro.jsx';
import {
  iniciarSesion,
  obtenerSesion,
  cerrarSesion
} from '../services/sesionService.js';
import {
  agregarUsuario,
  obtenerUsuarios
} from '../services/usuarioService.js';

describe('Registro e inicio de sesión', () => {
  const usuario = () => ({
    run: '12345678-9',
    nombreCompleto: 'Ana Pérez',
    correo: 'ana@gmail.com',
    direccion: 'Viña del Mar',
    contrasena: 'ClavePrueba123',
    rol: 'Cliente',
    activo: true
  });

  let respaldoUsuarios;
  let respaldoSesion;

  beforeEach(() => {
    respaldoUsuarios = localStorage.getItem('sonidoVivo_usuarios');
    respaldoSesion = sessionStorage.getItem('sonidoVivo_sesion');

    localStorage.removeItem('sonidoVivo_usuarios');
    sessionStorage.removeItem('sonidoVivo_sesion');
  });

  afterEach(() => {
    if (respaldoUsuarios === null) {
      localStorage.removeItem('sonidoVivo_usuarios');
    } else {
      localStorage.setItem('sonidoVivo_usuarios', respaldoUsuarios);
    }

    if (respaldoSesion === null) {
      sessionStorage.removeItem('sonidoVivo_sesion');
    } else {
      sessionStorage.setItem('sonidoVivo_sesion', respaldoSesion);
    }
  });

  const completarRegistro = (correo = 'ana@gmail.com') => {
    fireEvent.change(screen.getByLabelText(/RUN/i), {
      target: { value: '12345678-9' }
    });

    fireEvent.change(screen.getByLabelText(/NOMBRE COMPLETO/i), {
      target: { value: 'Ana Pérez' }
    });

    fireEvent.change(screen.getByLabelText(/^CORREO/i), {
      target: { value: correo }
    });

    fireEvent.change(screen.getByLabelText(/DIRECCIÓN/i), {
      target: { value: 'Viña del Mar' }
    });

    fireEvent.change(screen.getByLabelText(/^CONTRASEÑA/i), {
      target: { value: 'ClavePrueba123' }
    });

    fireEvent.change(screen.getByLabelText(/CONFIRMAR CONTRASEÑA/i), {
      target: { value: 'ClavePrueba123' }
    });
  };

  it('registra un usuario válido', () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    completarRegistro();

    fireEvent.click(
      screen.getByRole('button', { name: 'CREAR CUENTA' })
    );

    expect(obtenerUsuarios().length).toBe(1);
    expect(obtenerUsuarios()[0].rol).toBe('Cliente');
    expect(obtenerUsuarios()[0].activo).toBe(true);
  });

  it('rechaza un correo repetido', () => {
    agregarUsuario(usuario());

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    completarRegistro();

    fireEvent.change(screen.getByLabelText(/RUN/i), {
      target: { value: '98765432-1' }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'CREAR CUENTA' })
    );

    expect(screen.getByRole('alert').textContent)
      .toContain('El correo ya está registrado');

    expect(obtenerUsuarios().length).toBe(1);
  });

  it('inicia sesión con credenciales correctas', () => {
    agregarUsuario(usuario());

    const sesion = iniciarSesion(
      'ana@gmail.com',
      'ClavePrueba123'
    );

    expect(sesion.correo).toBe('ana@gmail.com');
    expect(obtenerSesion().nombreCompleto).toBe('Ana Pérez');
    expect(obtenerSesion().contrasena).toBeUndefined();
  });

  it('rechaza una contraseña incorrecta', () => {
    agregarUsuario(usuario());

    expect(() =>
      iniciarSesion('ana@gmail.com', 'ClaveIncorrecta')
    ).toThrowError();

    expect(obtenerSesion()).toBeNull();
  });

  it('rechaza usuarios desactivados', () => {
    agregarUsuario({
      ...usuario(),
      activo: false
    });

    expect(() =>
      iniciarSesion('ana@gmail.com', 'ClavePrueba123')
    ).toThrowError();

    expect(obtenerSesion()).toBeNull();
  });

  it('permite cerrar sesión', () => {
    agregarUsuario(usuario());
    iniciarSesion('ana@gmail.com', 'ClavePrueba123');

    cerrarSesion();

    expect(obtenerSesion()).toBeNull();
  });

  it('rechaza iniciar sesión con un correo no registrado', () => {
  agregarUsuario(usuario());

  expect(() =>
    iniciarSesion('desconocido@gmail.com', 'ClavePrueba123')
  ).toThrowError('Correo, contraseña o estado de cuenta incorrecto');

  expect(obtenerSesion()).toBeNull();
}); 
});
