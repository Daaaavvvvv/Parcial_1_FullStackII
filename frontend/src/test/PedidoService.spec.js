
import {
  confirmarCompra,
  obtenerPedidos
} from '../services/pedidoService.js';

import {
  obtenerProducto
} from '../services/productoService.js';

import {
  obtenerCarrito,
  agregarAlCarrito,
  cambiarCantidad,
  eliminarDelCarrito
} from '../services/carritoService.js';

describe('Issue 27 - Carrito y proceso de compra', () => {
  const datosValidos = {
    nombre: 'Cliente de prueba',
    correo: 'cliente@correo.cl',
    entrega: 'retiro',
    direccion: ''
  };

  const claves = ['productos', 'carrito', 'pedidos'];
  let respaldo;

  beforeEach(() => {
    respaldo = {};

    claves.forEach((clave) => {
      respaldo[clave] = localStorage.getItem(clave);
    });

    localStorage.setItem('productos', JSON.stringify([
      {
        codigo: 'TEST001',
        nombre: 'Guitarra de prueba',
        descripcion: 'Producto para pruebas',
        categoria: 'Instrumentos',
        precio: 10000,
        stock: 5,
        stockCritico: 1,
        imagen: ''
      },
      {
        codigo: 'TEST002',
        nombre: 'Teclado de prueba',
        descripcion: 'Producto para pruebas',
        categoria: 'Instrumentos',
        precio: 20000,
        stock: 3,
        stockCritico: 1,
        imagen: ''
      }
    ]));

    localStorage.setItem('carrito', JSON.stringify([]));
    localStorage.setItem('pedidos', JSON.stringify([]));
  });

  afterEach(() => {
    claves.forEach((clave) => {
      if (respaldo[clave] === null) {
        localStorage.removeItem(clave);
      } else {
        localStorage.setItem(clave, respaldo[clave]);
      }
    });
  });

  it('agrega productos al carrito sin descontar stock', () => {
    agregarAlCarrito('TEST001');

    expect(obtenerCarrito().length).toBe(1);
    expect(obtenerCarrito()[0].cantidad).toBe(1);
    expect(obtenerProducto('TEST001').stock).toBe(5);
  });

  it('permite modificar y eliminar productos', () => {
    agregarAlCarrito('TEST001');
    cambiarCantidad('TEST001', 3);

    expect(obtenerCarrito()[0].cantidad).toBe(3);

    eliminarDelCarrito('TEST001');

    expect(obtenerCarrito().length).toBe(0);
  });

  it('registra una compra y descuenta el stock', () => {
    agregarAlCarrito('TEST001');
    cambiarCantidad('TEST001', 2);

    const pedido = confirmarCompra(datosValidos);

    expect(pedido.total).toBe(20000);
    expect(pedido.estado).toBe('confirmado');
    expect(obtenerProducto('TEST001').stock).toBe(3);
    expect(obtenerCarrito().length).toBe(0);
    expect(obtenerPedidos().length).toBe(1);
  });

  it('permite una compra con despacho y dirección', () => {
    agregarAlCarrito('TEST002');

    const pedido = confirmarCompra({
      ...datosValidos,
      entrega: 'despacho',
      direccion: 'Av. Principal 123'
    });

    expect(pedido.entrega).toBe('despacho');
    expect(pedido.direccion).toBe('Av. Principal 123');
    expect(pedido.total).toBe(20000);
  });

  it('rechaza una compra sin productos', () => {
    expect(() => confirmarCompra(datosValidos))
      .toThrowError('El carrito está vacío');

    expect(obtenerPedidos().length).toBe(0);
  });

  it('rechaza una compra con stock insuficiente', () => {
    localStorage.setItem('carrito', JSON.stringify([
      {
        codigo: 'TEST001',
        nombre: 'Guitarra de prueba',
        precio: 10000,
        cantidad: 8
      }
    ]));

    expect(() => confirmarCompra(datosValidos))
      .toThrowError('Stock insuficiente para Guitarra de prueba');

    expect(obtenerProducto('TEST001').stock).toBe(5);
    expect(obtenerCarrito()[0].cantidad).toBe(8);
    expect(obtenerPedidos().length).toBe(0);
  });

  it('rechaza despacho sin dirección', () => {
    agregarAlCarrito('TEST001');

    expect(() => confirmarCompra({
      ...datosValidos,
      entrega: 'despacho',
      direccion: ''
    })).toThrowError('Debes ingresar una dirección de despacho');

    expect(obtenerCarrito().length).toBe(1);
    expect(obtenerProducto('TEST001').stock).toBe(5);
  });

  it('utiliza el precio vigente del producto', () => {
    agregarAlCarrito('TEST001');

    const productos = JSON.parse(localStorage.getItem('productos'));
    productos[0].precio = 15000;

    localStorage.setItem('productos', JSON.stringify(productos));

    const pedido = confirmarCompra(datosValidos);

    expect(pedido.total).toBe(15000);
    expect(pedido.productos[0].precio).toBe(15000);
  });
});
