import {
  consultarCategorias,
  agregarCategoria,
  editarCategoria,
  eliminarCategoria
} from '../services/categoriaService.js';
import { obtenerProducto } from '../services/productoService.js';

describe('categoriaService (agregar, editar y eliminar)', () => {
  beforeEach(() => {
    localStorage.removeItem('categorias');
    localStorage.removeItem('productos');
  });

  afterEach(() => {
    localStorage.removeItem('categorias');
    localStorage.removeItem('productos');
  });

  it('debe agregar una categoría con su id y conservarla', () => {
    const nueva = agregarCategoria('  Micrófonos  ');

    expect(nueva).toEqual({ id: 'microfonos', nombre: 'Micrófonos' });
    expect(consultarCategorias().length).toBe(6);
  });

  it('debe juntar los espacios repetidos del nombre', () => {
    const nueva = agregarCategoria('Cables   y   Fundas');

    expect(nueva.nombre).toBe('Cables y Fundas');
    expect(nueva.id).toBe('cables-y-fundas');
  });

  it('debe rechazar un nombre vacío', () => {
    expect(() => agregarCategoria('   ')).toThrowError(/obligatorio/);
    expect(() => agregarCategoria(undefined)).toThrowError(/obligatorio/);
    expect(consultarCategorias().length).toBe(5);
  });

  it('debe rechazar un nombre repetido sin importar las mayúsculas', () => {
    expect(() => agregarCategoria('baterías')).toThrowError(/Ya existe una categoría/);
    expect(consultarCategorias().length).toBe(5);
  });

  it('debe agregar un número al id si ya está ocupado', () => {
    const nueva = agregarCategoria('Baterias');

    expect(nueva.id).toBe('baterias-2');
    expect(consultarCategorias().length).toBe(6);
  });

  it('debe cambiar el nombre y actualizarlo en los productos', () => {
    const editada = editarCategoria('baterias', 'Percusión');

    expect(editada).toEqual({ id: 'baterias', nombre: 'Percusión' });
    expect(consultarCategorias().find((c) => c.id === 'baterias').nombre).toBe('Percusión');
    expect(obtenerProducto('BT001').categoria).toBe('Percusión');
    expect(obtenerProducto('GT001').categoria).toBe('Guitarras Acústicas');
  });

  it('debe permitir guardar la categoría sin cambiar su nombre', () => {
    const editada = editarCategoria('baterias', 'Baterías');

    expect(editada.nombre).toBe('Baterías');
    expect(obtenerProducto('BT001').categoria).toBe('Baterías');
  });

  it('debe rechazar editar con un nombre vacío', () => {
    expect(() => editarCategoria('baterias', '')).toThrowError(/obligatorio/);
  });

  it('debe rechazar editar una categoría que no existe', () => {
    expect(() => editarCategoria('no-existe', 'Otra')).toThrowError(/no existe/);
  });

  it('debe rechazar editar con el nombre de otra categoría', () => {
    expect(() => editarCategoria('baterias', 'amplificadores'))
      .toThrowError(/Ya existe una categoría/);
    expect(obtenerProducto('BT001').categoria).toBe('Baterías');
  });

  it('debe eliminar una categoría que no tiene productos', () => {
    agregarCategoria('Micrófonos');

    eliminarCategoria('microfonos');

    expect(consultarCategorias().length).toBe(5);
    expect(consultarCategorias().some((c) => c.id === 'microfonos')).toBe(false);
  });

  it('no debe eliminar una categoría asignada a productos', () => {
    expect(() => eliminarCategoria('baterias')).toThrowError(/No puedes eliminar/);
    expect(consultarCategorias().length).toBe(5);
  });

  it('debe rechazar eliminar una categoría que no existe', () => {
    expect(() => eliminarCategoria('no-existe')).toThrowError(/no existe/);
  });
});