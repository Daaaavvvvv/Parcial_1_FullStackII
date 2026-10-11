
import { categoriasIniciales } from '../data/categorias.js';
import {
  consultarProductos,
  reemplazarCategoriaEnProductos
} from './productoService.js';

const CLAVE_STORAGE = 'categorias';

function leerCategorias() {
  try {
    const guardadas = JSON.parse(
      localStorage.getItem(CLAVE_STORAGE)
    );

    if (Array.isArray(guardadas)) {
      return guardadas;
    }
  } catch {
    // Si el JSON está dañado, se usan las categorías iniciales.
  }

  return categoriasIniciales.map((categoria) => ({
    ...categoria
  }));
}

function guardarCategorias(categorias) {
  localStorage.setItem(
    CLAVE_STORAGE,
    JSON.stringify(categorias)
  );
}

function normalizarNombre(nombre) {
  return String(nombre ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}

function crearId(nombre) {
  return normalizarNombre(nombre)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function consultarCategorias() {
  return leerCategorias();
}

export function agregarCategoria(nombre) {
  const nombreNormalizado = normalizarNombre(nombre);

  if (!nombreNormalizado) {
    throw new Error(
      'El nombre de la categoría es obligatorio'
    );
  }

  const categorias = leerCategorias();

  const repetida = categorias.some(
    (categoria) =>
      categoria.nombre.toLowerCase() ===
      nombreNormalizado.toLowerCase()
  );

  if (repetida) {
    throw new Error(
      'Ya existe una categoría con ese nombre'
    );
  }

  const idBase = crearId(nombreNormalizado);

  let id = idBase;
  let sufijo = 2;

  while (categorias.some((categoria) => categoria.id === id)) {
    id = `${idBase}-${sufijo++}`;
  }

  const nueva = {
    id,
    nombre: nombreNormalizado
  };

  guardarCategorias([...categorias, nueva]);

  return nueva;
}

export function editarCategoria(id, nombre) {
  const nombreNormalizado = normalizarNombre(nombre);

  if (!nombreNormalizado) {
    throw new Error(
      'El nombre de la categoría es obligatorio'
    );
  }

  const categorias = leerCategorias();

  const indice = categorias.findIndex(
    (categoria) => categoria.id === id
  );

  if (indice === -1) {
    throw new Error('La categoría no existe');
  }

  const repetida = categorias.some(
    (categoria) =>
      categoria.id !== id &&
      categoria.nombre.toLowerCase() ===
        nombreNormalizado.toLowerCase()
  );

  if (repetida) {
    throw new Error(
      'Ya existe una categoría con ese nombre'
    );
  }

  const anterior = categorias[indice];

  const editada = {
    ...anterior,
    nombre: nombreNormalizado
  };

  const actualizadas = [...categorias];
  actualizadas[indice] = editada;

  // Actualizar los productos que usaban el nombre anterior.
  if (anterior.nombre !== nombreNormalizado) {
    reemplazarCategoriaEnProductos(
      anterior.nombre,
      nombreNormalizado
    );
  }

  guardarCategorias(actualizadas);

  return editada;
}

export function eliminarCategoria(id) {
  const categorias = leerCategorias();

  const categoria = categorias.find(
    (item) => item.id === id
  );

  if (!categoria) {
    throw new Error('La categoría no existe');
  }

  const enUso = consultarProductos().some(
    (producto) => producto.categoria === categoria.nombre
  );

  if (enUso) {
    throw new Error(
      'No puedes eliminar una categoría que está asignada a productos'
    );
  }

  guardarCategorias(
    categorias.filter((item) => item.id !== id)
  );
}
