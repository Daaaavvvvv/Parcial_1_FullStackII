
import {
  obtenerUsuarios,
  buscarUsuario,
  agregarUsuario,
  editarUsuario,
  eliminarUsuario,
  cambiarEstadoUsuario
} from '../services/usuarioService.js';

describe('Servicio de usuarios', () => {
  const usuarioValido = () => ({
    run: '12345678-9',
    nombreCompleto: 'Ana Pérez',
    correo: 'ana@gmail.com',
    direccion: 'Viña del Mar',
    contrasena: 'ClavePrueba123',
    rol: 'Cliente',
    activo: true
  });

  let respaldoUsuarios;

  beforeEach(() => {
    respaldoUsuarios = localStorage.getItem('sonidoVivo_usuarios');
    localStorage.removeItem('sonidoVivo_usuarios');
  });

  afterEach(() => {
    if (respaldoUsuarios === null) {
      localStorage.removeItem('sonidoVivo_usuarios');
    } else {
      localStorage.setItem('sonidoVivo_usuarios', respaldoUsuarios);
    }
  });

  it('debe agregar un usuario correctamente', () => {
    agregarUsuario(usuarioValido());

    expect(obtenerUsuarios().length).toBe(1);
    expect(obtenerUsuarios()[0].nombreCompleto).toBe('Ana Pérez');
  });

  it('debe encontrar un usuario por RUN', () => {
    agregarUsuario(usuarioValido());

    const usuario = buscarUsuario('12345678-9');

    expect(usuario).not.toBeNull();
    expect(usuario.correo).toBe('ana@gmail.com');
  });

  it('debe editar un usuario', () => {
    agregarUsuario(usuarioValido());

    editarUsuario('12345678-9', {
      nombreCompleto: 'Ana González'
    });

    expect(buscarUsuario('12345678-9').nombreCompleto)
      .toBe('Ana González');
  });

  it('debe eliminar un usuario', () => {
    agregarUsuario(usuarioValido());

    eliminarUsuario('12345678-9');

    expect(obtenerUsuarios().length).toBe(0);
  });

  it('debe rechazar RUN repetidos', () => {
    agregarUsuario(usuarioValido());

    expect(() => agregarUsuario(usuarioValido()))
      .toThrowError('El RUN ya existe');

    expect(obtenerUsuarios().length).toBe(1);
  });

  it('debe rechazar correos repetidos', () => {
    agregarUsuario(usuarioValido());

    const segundoUsuario = {
      ...usuarioValido(),
      run: '98765432-1'
    };

    expect(() => agregarUsuario(segundoUsuario))
      .toThrowError('El correo ya está registrado');

    expect(obtenerUsuarios().length).toBe(1);
  });

  it('debe rechazar campos obligatorios vacíos', () => {
    const usuario = {
      ...usuarioValido(),
      nombreCompleto: ''
    };

    expect(() => agregarUsuario(usuario))
      .toThrowError('Todos los campos son obligatorios');

    expect(obtenerUsuarios().length).toBe(0);
  });

  it('debe rechazar correos inválidos', () => {
    const usuario = {
      ...usuarioValido(),
      correo: 'correo-invalido'
    };

    expect(() => agregarUsuario(usuario))
      .toThrowError('Correo inválido');

    expect(obtenerUsuarios().length).toBe(0);
  });

  it('debe rechazar roles inválidos', () => {
    const usuario = {
      ...usuarioValido(),
      rol: 'Supervisor'
    };

    expect(() => agregarUsuario(usuario))
      .toThrowError('Rol inválido');

    expect(obtenerUsuarios().length).toBe(0);
  });

  it('debe desactivar y activar un usuario', () => {
    agregarUsuario(usuarioValido());

    cambiarEstadoUsuario('12345678-9', false);

    expect(buscarUsuario('12345678-9').activo).toBe(false);

    cambiarEstadoUsuario('12345678-9', true);

    expect(buscarUsuario('12345678-9').activo).toBe(true);
  });

  it('debe rechazar un correo duplicado al editar', () => {
    agregarUsuario(usuarioValido());

    agregarUsuario({
      ...usuarioValido(),
      run: '98765432-1',
      correo: 'carlos@gmail.com'
    });

    expect(() =>
      editarUsuario('98765432-1', {
        correo: 'ana@gmail.com'
      })
    ).toThrowError('El correo ya está registrado');

    expect(buscarUsuario('98765432-1').correo)
      .toBe('carlos@gmail.com');
  });

  it('debe conservar los usuarios en localStorage', () => {
    agregarUsuario(usuarioValido());

    const guardados = JSON.parse(
      localStorage.getItem('sonidoVivo_usuarios')
    );

    expect(guardados.length).toBe(1);
    expect(guardados[0].run).toBe('12345678-9');
  });
});
