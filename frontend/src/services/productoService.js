import { productosIniciales } from '../data/productos.js';

const CLAVE_STORAGE = 'productos';

function leerProductos() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    if (Array.isArray(guardados)) return guardados;
  } catch {
    /* sin storage o JSON dañado: se usan los productos iniciales */
  }
  return productosIniciales.map((p) => ({ ...p }));
}

function guardarProductos(lista) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
  } catch {
    /* sin storage disponible: los cambios quedan solo en esta sesión */
  }
}

function normalizarCodigo(codigo) {
  return String(codigo ?? '').trim().toUpperCase();
}

function aNumero(valor) {
  return valor === '' || valor == null ? NaN : Number(valor);
}

function armarProducto(codigo, datos) {
  const nombre = String(datos.nombre ?? '').trim();
  if (!nombre) throw new Error('El nombre es obligatorio');

  const categoria = String(datos.categoria ?? '').trim();
  if (!categoria) throw new Error('La categoría es obligatoria');

  const precio = aNumero(datos.precio);
  if (!Number.isFinite(precio) || precio <= 0) {
    throw new Error('El precio debe ser un número mayor a 0');
  }

  const stock = aNumero(datos.stock);
  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error('El stock debe ser un número entero mayor o igual a 0');
  }

  let stockCritico = null;
  if (datos.stockCritico !== '' && datos.stockCritico != null) {
    stockCritico = Number(datos.stockCritico);
    if (!Number.isInteger(stockCritico) || stockCritico < 0) {
      throw new Error('El stock crítico debe ser un número entero mayor o igual a 0');
    }
  }

  return {
    codigo,
    nombre,
    descripcion: String(datos.descripcion ?? '').trim(),
    precio,
    stock,
    stockCritico,
    categoria,
    imagen: datos.imagen ?? '',
  };
}

export function consultarProductos() {
  return leerProductos();
}

export function obtenerProducto(codigo) {
  const buscado = normalizarCodigo(codigo);
  return leerProductos().find((p) => p.codigo === buscado);
}

export function buscarProductos(texto) {
  const termino = String(texto ?? '').trim().toLowerCase();
  const lista = leerProductos();
  if (!termino) return lista;

  return lista.filter(
    (p) =>
      p.codigo.toLowerCase().includes(termino) ||
      p.nombre.toLowerCase().includes(termino) ||
      p.categoria.toLowerCase().includes(termino)
  );
}

export function agregarProducto(datos) {
  const codigo = normalizarCodigo(datos.codigo);
  if (!codigo) throw new Error('El código es obligatorio');

  const lista = leerProductos();
  if (lista.some((p) => p.codigo === codigo)) {
    throw new Error(`Ya existe un producto con el código ${codigo}`);
  }

  const nuevo = armarProducto(codigo, datos);
  guardarProductos([...lista, nuevo]);
  return nuevo;
}

export function editarProducto(codigo, cambios) {
  const buscado = normalizarCodigo(codigo);
  const lista = leerProductos();
  const indice = lista.findIndex((p) => p.codigo === buscado);
  if (indice === -1) throw new Error(`No existe el producto ${buscado}`);

  // el código no se modifica al editar
  const editado = armarProducto(buscado, { ...lista[indice], ...cambios });
  const nuevaLista = [...lista];
  nuevaLista[indice] = editado;
  guardarProductos(nuevaLista);
  return editado;
}

export function eliminarProducto(codigo) {
  const buscado = normalizarCodigo(codigo);
  const lista = leerProductos();
  if (!lista.some((p) => p.codigo === buscado)) {
    throw new Error(`No existe el producto ${buscado}`);
  }

  guardarProductos(lista.filter((p) => p.codigo !== buscado));
}