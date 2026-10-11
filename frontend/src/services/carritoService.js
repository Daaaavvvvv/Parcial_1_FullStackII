import { obtenerProducto } from './productoService.js';

const CLAVE_STORAGE = 'carrito';

function leerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    if (Array.isArray(guardado)) return guardado;
  } catch {
    /* sin storage o JSON dañado: se parte con el carrito vacío */
  }
  return [];
}

function guardarCarrito(lista) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
  } catch {
    /* sin storage disponible: el carrito queda solo en esta sesión */
  }
  window.dispatchEvent(new Event('carritoActualizado'));
}

export function obtenerCarrito() {
  return leerCarrito();
}

export function contarCarrito() {
  return leerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

export function agregarAlCarrito(codigo) {
  const producto = obtenerProducto(codigo);
  if (!producto) throw new Error('El producto no existe');
  if (producto.stock <= 0) throw new Error('El producto no tiene stock');

  const carrito = leerCarrito();
  const item = carrito.find((i) => i.codigo === producto.codigo);

  if (item) {
    if (item.cantidad >= producto.stock) {
      throw new Error('No quedan más unidades disponibles de este producto');
    }
    item.cantidad += 1;
  } else {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  return carrito;
}