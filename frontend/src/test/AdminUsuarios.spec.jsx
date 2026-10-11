
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminUsuarios from '../pages/AdminUsuarios.jsx';
import {
  agregarUsuario,
  buscarUsuario,
  obtenerUsuarios
} from '../services/usuarioService.js';

describe('Administración de usuarios', () => {
  const usuario = () => ({
    run: '12345678-9',
    nombreCompleto: 'Ana Pérez',
    correo: 'ana@gmail.com',
    direccion: 'Viña del Mar',
    contrasena: 'ClavePrueba123',
    rol: 'Cliente',
    activo: true
  });

  const mostrarAdministracion = () => {
    render(
      <MemoryRouter>
        <AdminUsuarios />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    localStorage.removeItem('sonidoVivo_usuarios');
  });

  afterEach(() => {
    localStorage.removeItem('sonidoVivo_usuarios');
  });

  it('muestra los usuarios registrados', () => {
    agregarUsuario(usuario());

    mostrarAdministracion();

    expect(screen.getByText('Ana Pérez')).toBeTruthy();
    expect(screen.getByText('ana@gmail.com')).toBeTruthy();
    expect(screen.getByText('12345678-9')).toBeTruthy();
  });

  it('muestra un mensaje cuando no hay usuarios', () => {
    mostrarAdministracion();

    expect(
      screen.getByText('No hay usuarios registrados.')
    ).toBeTruthy();
  });

  it('tiene un enlace para agregar usuarios', () => {
    mostrarAdministracion();

    const enlace = screen.getByRole('link', {
      name: /Nuevo Usuario/i
    });

    expect(enlace.getAttribute('href'))
      .toBe('/admin/usuarios/nuevo');
  });

  it('permite acceder a la edición del usuario correcto', () => {
    agregarUsuario(usuario());

    mostrarAdministracion();

    const enlace = screen.getByRole('link', {
      name: 'Editar'
    });

    expect(enlace.getAttribute('href'))
      .toBe('/admin/usuarios/12345678-9/editar');
  });

  it('solicita confirmación antes de eliminar', () => {
    agregarUsuario(usuario());

    const confirmarSpy = spyOn(window, 'confirm')
      .and.returnValue(false);

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Eliminar' })
    );

    expect(confirmarSpy).toHaveBeenCalledTimes(1);
    expect(confirmarSpy).toHaveBeenCalledWith(
      '¿Estás seguro de eliminar a Ana Pérez?'
    );
  });

  it('conserva al usuario cuando se cancela la eliminación', () => {
    agregarUsuario(usuario());

    spyOn(window, 'confirm').and.returnValue(false);

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Eliminar' })
    );

    expect(buscarUsuario('12345678-9')).not.toBeNull();
    expect(obtenerUsuarios().length).toBe(1);
    expect(screen.getByText('Ana Pérez')).toBeTruthy();
  });

  it('elimina al usuario cuando se confirma', () => {
    agregarUsuario(usuario());

    spyOn(window, 'confirm').and.returnValue(true);

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Eliminar' })
    );

    expect(buscarUsuario('12345678-9')).toBeNull();
    expect(obtenerUsuarios().length).toBe(0);

    expect(
      screen.getByText('No hay usuarios registrados.')
    ).toBeTruthy();
  });

  it('permite desactivar un usuario', () => {
    agregarUsuario(usuario());

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Desactivar' })
    );

    expect(buscarUsuario('12345678-9').activo).toBe(false);
    expect(screen.getByText('Desactivado')).toBeTruthy();
  });

  it('permite activar un usuario desactivado', () => {
    agregarUsuario({
      ...usuario(),
      activo: false
    });

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Activar' })
    );

    expect(buscarUsuario('12345678-9').activo).toBe(true);
    expect(screen.getByText('Activo')).toBeTruthy();
  });

  it('muestra el perfil del usuario seleccionado', () => {
    agregarUsuario(usuario());

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Ver' })
    );

    const detalle = screen.getByRole('region', {
      name: 'Detalle del usuario'
    });

    expect(detalle.textContent).toContain('Ana Pérez');
    expect(detalle.textContent).toContain('ana@gmail.com');
    expect(detalle.textContent).toContain('Viña del Mar');
    expect(detalle.textContent).toContain('Cliente');
  });

  it('muestra el perfil correspondiente al usuario correcto', () => {
    agregarUsuario(usuario());

    agregarUsuario({
      ...usuario(),
      run: '98765432-1',
      nombreCompleto: 'Carlos Soto',
      correo: 'carlos@gmail.com'
    });

    mostrarAdministracion();

    const botonesVer = screen.getAllByRole('button', {
      name: 'Ver'
    });

    fireEvent.click(botonesVer[1]);

    const detalle = screen.getByRole('region', {
      name: 'Detalle del usuario'
    });

    expect(detalle.textContent).toContain('Carlos Soto');
    expect(detalle.textContent).toContain('carlos@gmail.com');
    expect(detalle.textContent).not.toContain('Ana Pérez');
  });

  it('permite cerrar el detalle del usuario', () => {
    agregarUsuario(usuario());

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Ver' })
    );

    expect(
      screen.getByRole('region', { name: 'Detalle del usuario' })
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', { name: 'Cerrar' })
    );

    expect(
      screen.queryByRole('region', { name: 'Detalle del usuario' })
    ).toBeNull();
  });

  it('muestra el estado provisional del historial de compras', () => {
    agregarUsuario(usuario());

    mostrarAdministracion();

    fireEvent.click(
      screen.getByRole('button', { name: 'Ver' })
    );

    expect(
      screen.getByText(
        'No hay un historial de compras disponible para este usuario.'
      )
    ).toBeTruthy();
  });
});
