import {
  consultarProductos,
  obtenerProducto,
  buscarProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from '../services/productoService.js';
import { productosIniciales } from '../data/productos.js';

describe('productoService', () => {
  const productoValido = {
    codigo: 'mc001',
    nombre: 'Micrófono Shure SM58',
    descripcion: 'Micrófono dinámico',
    precio: 99990,
    stock: 4,
    categoria: 'Micrófonos',
    imagen: '/img/mc001.jpg',
  };

  beforeEach(() => {
    localStorage.removeItem('productos');
  });

  afterEach(() => {
    localStorage.removeItem('productos');
  });

  it('debe devolver los productos iniciales si no hay cambios guardados', () => {
    expect(consultarProductos().length).toBe(productosIniciales.length);
  });

  it('debe usar los productos iniciales si lo guardado está dañado', () => {
    localStorage.setItem('productos', '{no es json');
    expect(consultarProductos().length).toBe(productosIniciales.length);
  });

  it('debe obtener un producto por código sin importar mayúsculas', () => {
    expect(obtenerProducto('gt001').nombre).toBe('Guitarra Acústica Yamaha');
    expect(obtenerProducto('XX999')).toBeUndefined();
  });

  it('debe buscar por código, nombre o categoría', () => {
    expect(buscarProductos('fender').length).toBe(1);
    expect(buscarProductos('AM001').length).toBe(1);
    expect(buscarProductos('guitarras').length).toBe(2);
    expect(buscarProductos('')).toEqual(consultarProductos());
    expect(buscarProductos('no existe').length).toBe(0);
  });

  it('debe agregar un producto y conservarlo al volver a consultar', () => {
    const nuevo = agregarProducto(productoValido);

    expect(nuevo.codigo).toBe('MC001');
    expect(consultarProductos().length).toBe(productosIniciales.length + 1);
    expect(obtenerProducto('MC001').nombre).toBe('Micrófono Shure SM58');
  });

  it('no debe modificar los productos iniciales al agregar', () => {
    agregarProducto(productoValido);
    expect(productosIniciales.length).toBe(5);
  });

  it('debe rechazar códigos repetidos', () => {
    expect(() => agregarProducto({ ...productoValido, codigo: 'gt001' }))
      .toThrowError(/Ya existe un producto/);
    expect(consultarProductos().length).toBe(productosIniciales.length);
  });

  it('debe rechazar un código vacío', () => {
    expect(() => agregarProducto({ ...productoValido, codigo: '  ' }))
      .toThrowError(/código es obligatorio/);
  });

  it('debe rechazar nombre o categoría vacíos', () => {
    expect(() => agregarProducto({ ...productoValido, nombre: '' }))
      .toThrowError(/nombre es obligatorio/);
    expect(() => agregarProducto({ ...productoValido, categoria: '' }))
      .toThrowError(/categoría es obligatoria/);
  });

  it('debe rechazar precios inválidos', () => {
    [0, -500, 'abc', '', null].forEach((precio) => {
      expect(() => agregarProducto({ ...productoValido, precio }))
        .toThrowError(/precio/);
    });
  });

  it('debe rechazar stock negativo, decimal o vacío', () => {
    [-1, 2.5, 'x', ''].forEach((stock) => {
      expect(() => agregarProducto({ ...productoValido, stock }))
        .toThrowError(/stock/);
    });
  });

  it('debe aceptar stock 0 y validar el stock crítico', () => {
    expect(agregarProducto({ ...productoValido, stock: 0, stockCritico: 2 }).stockCritico).toBe(2);
    expect(() => agregarProducto({ ...productoValido, codigo: 'MC002', stockCritico: -3 }))
      .toThrowError(/stock crítico/);
  });

  it('debe editar un producto sin cambiar su código', () => {
    const editado = editarProducto('GT001', { precio: 79990, stock: 20, codigo: 'OTRO' });

    expect(editado.codigo).toBe('GT001');
    expect(obtenerProducto('GT001').precio).toBe(79990);
    expect(obtenerProducto('GT001').stock).toBe(20);
    expect(obtenerProducto('OTRO')).toBeUndefined();
  });

  it('debe rechazar ediciones inválidas y productos inexistentes', () => {
    expect(() => editarProducto('GT001', { precio: -10 })).toThrowError(/precio/);
    expect(() => editarProducto('GT001', { stock: -1 })).toThrowError(/stock/);
    expect(obtenerProducto('GT001').precio).toBe(89990);
    expect(() => editarProducto('XX999', { precio: 100 })).toThrowError(/No existe/);
  });

  it('debe eliminar un producto', () => {
    eliminarProducto('bt001');

    expect(obtenerProducto('BT001')).toBeUndefined();
    expect(consultarProductos().length).toBe(productosIniciales.length - 1);
  });

  it('debe rechazar eliminar un producto inexistente', () => {
    expect(() => eliminarProducto('XX999')).toThrowError(/No existe/);
  });
});