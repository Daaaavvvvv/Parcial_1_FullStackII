
import { obtenerProducto } from './productoService.js';

const CLAVE_STORAGE = 'carrito';

function leerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    if (Array.isArray(guardado)) return guardado;
  } catch {
    return [];
  }
  return [];
}

function guardarCarrito(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
  window.dispatchEvent(new Event('carritoActualizado'));
}

export function obtenerCarrito() {
  return leerCarrito();
}

export function contarCarrito() {
  return leerCarrito().reduce(
    (total, item) => total + item.cantidad,
    0
  );
}

export function agregarAlCarrito(codigo) {
  const producto = obtenerProducto(codigo);

  if (!producto) {
    throw new Error('El producto no existe');
  }

  if (producto.stock <= 0) {
    throw new Error('El producto no tiene stock');
  }

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
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

export function agregarCantidadAlCarrito(codigo, cantidad) {
  const producto = obtenerProducto(codigo);

  if (!producto) {
    throw new Error('El producto no existe');
  }

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new Error('La cantidad debe ser un entero mayor a cero');
  }

  const carrito = leerCarrito();
  const existente = carrito.find(
    (item) => item.codigo === producto.codigo
  );

  const cantidadActual = existente?.cantidad || 0;

  if (cantidadActual + cantidad > producto.stock) {
    throw new Error('No hay suficientes unidades disponibles');
  }

  const actualizado = carrito.map((item) => ({ ...item }));
  const itemActual = actualizado.find(
    (item) => item.codigo === producto.codigo
  );

  if (itemActual) {
    itemActual.cantidad += cantidad;
  } else {
    actualizado.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad
    });
  }

  guardarCarrito(actualizado);
  return actualizado;
}

export function cambiarCantidad(codigo, cantidad) {
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new Error('La cantidad debe ser un entero mayor a cero');
  }

  const producto = obtenerProducto(codigo);

  if (!producto) {
    throw new Error('El producto no existe');
  }

  const carrito = leerCarrito();
  const item = carrito.find((i) => i.codigo === codigo);

  if (!item) {
    throw new Error('El producto no está en el carrito');
  }

  if (cantidad > producto.stock) {
    throw new Error('No hay suficientes unidades disponibles');
  }

  const actualizado = carrito.map((i) =>
    i.codigo === codigo ? { ...i, cantidad } : i
  );

  guardarCarrito(actualizado);
  return actualizado;
}

export function eliminarDelCarrito(codigo) {
  const carrito = leerCarrito();
  const actualizado = carrito.filter(
    (item) => item.codigo !== codigo
  );

  guardarCarrito(actualizado);
  return actualizado;
}

export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}

export function calcularTotal() {
  return leerCarrito().reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
}
