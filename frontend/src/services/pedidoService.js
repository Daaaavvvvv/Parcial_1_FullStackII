
import {
  obtenerProducto,
  descontarStockProductos
} from './productoService.js';

import {
  obtenerCarrito,
  vaciarCarrito
} from './carritoService.js';

const CLAVE_PEDIDOS = 'pedidos';

export function obtenerPedidos() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS));
    return Array.isArray(guardados) ? guardados : [];
  } catch {
    return [];
  }
}

function validarDatosCompra(datos) {
  const nombre = String(datos?.nombre ?? '').trim();
  const correo = String(datos?.correo ?? '').trim();
  const entrega = datos?.entrega;
  const direccion = String(datos?.direccion ?? '').trim();

  if (!nombre || !correo) {
    throw new Error('Debes completar los datos del comprador');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(correo)) {
    throw new Error('Ingresa un correo válido');
  }

  if (!['retiro', 'despacho'].includes(entrega)) {
    throw new Error('Selecciona un tipo de entrega válido');
  }

  if (entrega === 'despacho' && !direccion) {
    throw new Error('Debes ingresar una dirección de despacho');
  }

  return { nombre, correo, entrega, direccion };
}

function validarProductos(carrito) {
  if (carrito.length === 0) {
    throw new Error('El carrito está vacío');
  }

  const cantidades = new Map();

  for (const item of carrito) {
    const codigo = String(item.codigo ?? '').trim().toUpperCase();

    if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
      throw new Error(`Cantidad inválida para ${codigo}`);
    }

    cantidades.set(
      codigo,
      (cantidades.get(codigo) || 0) + item.cantidad
    );
  }

  return Array.from(cantidades, ([codigo, cantidad]) => {
    const producto = obtenerProducto(codigo);

    if (!producto) {
      throw new Error(`El producto ${codigo} no existe`);
    }

    if (cantidad > producto.stock) {
      throw new Error(`Stock insuficiente para ${producto.nombre}`);
    }

    return {
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      subtotal: producto.precio * cantidad
    };
  });
}

function restaurarClave(clave, valor) {
  if (valor === null) {
    localStorage.removeItem(clave);
  } else {
    localStorage.setItem(clave, valor);
  }
}

export function confirmarCompra(datosCompra) {
  // 1. Validar antes de modificar cualquier dato.
  const datos = validarDatosCompra(datosCompra);
  const carrito = obtenerCarrito();
  const productos = validarProductos(carrito);

  const total = productos.reduce(
    (suma, item) => suma + item.subtotal,
    0
  );

  // 2. Preparar el pedido.
  const pedido = {
    id: `PED-${Date.now()}`,
    fecha: new Date().toISOString(),
    comprador: {
      nombre: datos.nombre,
      correo: datos.correo
    },
    entrega: datos.entrega,
    direccion: datos.entrega === 'despacho'
      ? datos.direccion
      : null,
    productos,
    total,
    estado: 'confirmado'
  };

  // 3. Obtener los pedidos existentes.
  const pedidos = obtenerPedidos();

  // 4. Respaldar los datos antes de escribir.
  const claves = ['productos', 'pedidos', 'carrito'];
  const respaldo = {};

  for (const clave of claves) {
    respaldo[clave] = localStorage.getItem(clave);
  }

  try {
    // 5. Descontar el stock del catálogo.
    descontarStockProductos(productos);

    // 6. Registrar la compra.
    localStorage.setItem(
      CLAVE_PEDIDOS,
      JSON.stringify([...pedidos, pedido])
    );

    // 7. Vaciar el carrito únicamente al confirmar.
    vaciarCarrito();

    return pedido;
  } catch (error) {
    // 8. Recuperar los datos si falla una escritura.
    const erroresRestauracion = [];

    for (const clave of claves) {
      try {
        restaurarClave(clave, respaldo[clave]);
      } catch {
        erroresRestauracion.push(clave);
      }
    }

    if (erroresRestauracion.length > 0) {
      throw new Error(
        `La compra falló y no se pudieron restaurar: ${erroresRestauracion.join(', ')}`,
        { cause: error }
      );
    }

    window.dispatchEvent(new Event('carritoActualizado'));

    throw new Error('No se pudo registrar la compra', {
      cause: error
    });
  }
}
