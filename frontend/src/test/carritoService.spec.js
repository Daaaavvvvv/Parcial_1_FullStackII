import {
  obtenerCarrito,
  contarCarrito,
  agregarAlCarrito,
} from '../services/carritoService.js';
import { editarProducto } from '../services/productoService.js';

describe('carritoService', () => {
  beforeEach(() => {
    localStorage.removeItem('productos');
    localStorage.removeItem('carrito');
  });

  afterEach(() => {
    localStorage.removeItem('productos');
    localStorage.removeItem('carrito');
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
});