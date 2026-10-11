import { categoriasIniciales } from '../data/categorias.js';

const CLAVE_STORAGE = 'categorias';

export function consultarCategorias() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    if (Array.isArray(guardadas)) return guardadas;
  } catch {
    // Si hay un error, se usan las categorías iniciales
  }

  return categoriasIniciales.map((c) => ({ ...c }));
}