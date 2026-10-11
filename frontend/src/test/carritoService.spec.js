import {
  obtenerCarrito,
  contarCarrito,
  agregarAlCarrito,
  cambiarCantidad,
  eliminarDelCarrito,
  calcularTotal
} from '../services/carritoService.js';
import { editarProducto } from '../services/productoService.js';

describe('carritoService', () => {
  let respaldoProductos;
  let respaldoCarrito;

  beforeEach(() => {
    respaldoProductos = localStorage.getItem('productos');
    respaldoCarrito = localStorage.getItem('carrito');

    localStorage.removeItem('productos');
    localStorage.removeItem('carrito');
  });

  afterEach(() => {
    if (respaldoProductos === null) {
      localStorage.removeItem('productos');
    } else {
      localStorage.setItem('productos', respaldoProductos);
    }

    if (respaldoCarrito === null) {
      localStorage.removeItem('carrito');
    } else {
      localStorage.setItem('carrito', respaldoCarrito);
    }
  });

  it('debe partir con el carrito vacío', () => {
    expect(obtenerCarrito()).toEqual([]);
    expect(contarCarrito()).toBe(0);
  });

  it('debe partir vacío si lo guardado está dañado', () => {
    localStorage.setItem('carrito', '{no es json');
    expect(obtenerCarrito()).toEqual([]);
  });

  it('debe agregar un producto nuevo con cantidad 1', () => {
    const carrito = agregarAlCarrito('gt001');

    expect(carrito.length).toBe(1);
    expect(carrito[0]).toEqual({
      codigo: 'GT001',
      nombre: 'Guitarra Acústica Yamaha',
      precio: 89990,
      imagen: '/img/gt001.jpg',
      cantidad: 1,
    });
  });

  it('debe sumar la cantidad si el producto ya está en el carrito', () => {
    agregarAlCarrito('GT001');
    agregarAlCarrito('GT001');
    agregarAlCarrito('AM001');

    expect(obtenerCarrito().length).toBe(2);
    expect(obtenerCarrito()[0].cantidad).toBe(2);
    expect(contarCarrito()).toBe(3);
  });

  it('debe rechazar un producto que no existe', () => {
    expect(() => agregarAlCarrito('XX999')).toThrowError(/no existe/);
    expect(obtenerCarrito()).toEqual([]);
  });

  it('debe rechazar un producto sin stock', () => {
    editarProducto('GT001', { stock: 0 });

    expect(() => agregarAlCarrito('GT001')).toThrowError(/no tiene stock/);
    expect(obtenerCarrito()).toEqual([]);
  });

  it('no debe permitir agregar más unidades que el stock', () => {
    editarProducto('GT002', { stock: 2 });

    agregarAlCarrito('GT002');
    agregarAlCarrito('GT002');

    expect(() => agregarAlCarrito('GT002')).toThrowError(/No quedan más unidades/);
    expect(contarCarrito()).toBe(2);
  });

  it('debe avisar con un evento cuando el carrito cambia', () => {
    const avisoSpy = jasmine.createSpy('carritoActualizado');
    window.addEventListener('carritoActualizado', avisoSpy);

    agregarAlCarrito('GT001');

    window.removeEventListener('carritoActualizado', avisoSpy);
    expect(avisoSpy).toHaveBeenCalledTimes(1);
  });

  
it('debe permitir modificar la cantidad de un producto', () => {
  agregarAlCarrito('GT001');

  cambiarCantidad('GT001', 3);

  expect(obtenerCarrito()[0].cantidad).toBe(3);
  expect(contarCarrito()).toBe(3);
});

it('debe rechazar cantidades mayores al stock disponible', () => {
  editarProducto('GT001', { stock: 2 });
  agregarAlCarrito('GT001');

  expect(() => cambiarCantidad('GT001', 3))
    .toThrowError('No hay suficientes unidades disponibles');

  expect(obtenerCarrito()[0].cantidad).toBe(1);
});

it('debe rechazar cantidades iguales o menores a cero', () => {
  agregarAlCarrito('GT001');

  expect(() => cambiarCantidad('GT001', 0))
    .toThrowError('La cantidad debe ser un entero mayor a cero');

  expect(() => cambiarCantidad('GT001', -1))
    .toThrowError('La cantidad debe ser un entero mayor a cero');

  expect(obtenerCarrito()[0].cantidad).toBe(1);
});

it('debe calcular correctamente el total del carrito', () => {
  agregarAlCarrito('GT001');
  cambiarCantidad('GT001', 2);

  expect(calcularTotal()).toBe(179980);
});

it('debe eliminar un producto y actualizar el total', () => {
  agregarAlCarrito('GT001');
  agregarAlCarrito('GT001');

  expect(calcularTotal()).toBe(179980);

  eliminarDelCarrito('GT001');

  expect(obtenerCarrito()).toEqual([]);
  expect(contarCarrito()).toBe(0);
  expect(calcularTotal()).toBe(0);
});
});