import { consultarCategorias } from '../services/categoriaService.js';
import { categoriasIniciales } from '../data/categorias.js';

describe('categoriaService', () => {
  beforeEach(() => {
    localStorage.removeItem('categorias');
  });

  afterEach(() => {
    localStorage.removeItem('categorias');
  });

  it('debe devolver las categorías iniciales si no hay cambios guardados', () => {
    const categorias = consultarCategorias();

    expect(categorias.length).toBe(categoriasIniciales.length);
    expect(categorias[0].nombre).toBe('Guitarras Acústicas');
  });

  it('debe usar las categorías iniciales si lo guardado está dañado', () => {
    localStorage.setItem('categorias', '{no es json');

    expect(consultarCategorias().length).toBe(categoriasIniciales.length);
  });

  it('debe devolver las categorías guardadas', () => {
    localStorage.setItem(
      'categorias',
      JSON.stringify([{ id: 'micros', nombre: 'Micrófonos' }])
    );

    expect(consultarCategorias()).toEqual([{ id: 'micros', nombre: 'Micrófonos' }]);
  });

  it('no debe modificar las categorías iniciales', () => {
    consultarCategorias().push({ id: 'x', nombre: 'X' });

    expect(categoriasIniciales.length).toBe(5);
  });
});