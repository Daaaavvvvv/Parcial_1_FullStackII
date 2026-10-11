import { render, screen, fireEvent } from '@testing-library/react';
import FormularioProducto from '../components/FormularioProducto';

describe('FormularioProducto', () => {
  let guardarSpy;
  let cancelarSpy;

  const mostrar = (props = {}) =>
    render(
      <FormularioProducto
        onGuardar={guardarSpy}
        onCancelar={cancelarSpy}
        {...props}
      />
    );

  const escribir = (etiqueta, valor) => {
    fireEvent.change(screen.getByLabelText(etiqueta), {
      target: { value: valor }
    });
  };

  const completarFormulario = () => {
    escribir(/^Código/, ' mc001 ');
    escribir(/^Nombre/, 'Micrófono Shure');
    escribir(/^Descripción/, 'Micrófono dinámico');
    escribir(/^Precio/, '99990');
    escribir(/^Stock \*/, '4');
    escribir(/^Categoría/, 'Baterías');
    escribir(/^Imagen/, '/img/mc001.jpg');
  };

  const enviar = () => {
    fireEvent.click(screen.getByRole('button', { name: /Guardar/i }));
  };

  beforeEach(() => {
    localStorage.removeItem('categorias');
    guardarSpy = jasmine.createSpy('onGuardar');
    cancelarSpy = jasmine.createSpy('onCancelar');
  });

  it('debe mostrar los campos y las categorías disponibles', () => {
    mostrar();

    expect(screen.getByLabelText(/^Código/)).toBeTruthy();
    expect(screen.getByLabelText(/^Precio/)).toBeTruthy();
    expect(screen.getByLabelText(/^Stock crítico/)).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Guitarras Acústicas' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Amplificadores' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Guardar producto' })).toBeTruthy();
  });

  it('debe entregar los datos limpios al guardar', () => {
    mostrar();
    completarFormulario();
    enviar();

    expect(guardarSpy).toHaveBeenCalledWith({
      codigo: 'mc001',
      nombre: 'Micrófono Shure',
      descripcion: 'Micrófono dinámico',
      precio: 99990,
      stock: 4,
      stockCritico: null,
      categoria: 'Baterías',
      imagen: '/img/mc001.jpg'
    });
  });

  it('debe entregar el stock crítico cuando se escribe', () => {
    mostrar();
    completarFormulario();
    escribir(/^Stock crítico/, '2');
    enviar();

    expect(guardarSpy.calls.mostRecent().args[0].stockCritico).toBe(2);
  });

  it('debe exigir código, nombre y categoría', () => {
    mostrar();
    enviar();

    expect(screen.getByRole('alert').textContent)
      .toBe('Código, nombre y categoría son obligatorios');
    expect(guardarSpy).not.toHaveBeenCalled();
  });

  it('debe rechazar precios inválidos', () => {
    mostrar();
    completarFormulario();
    escribir(/^Precio/, '0');
    enviar();

    expect(screen.getByRole('alert').textContent)
      .toBe('El precio debe ser un número mayor a 0');
    expect(guardarSpy).not.toHaveBeenCalled();
  });

  it('debe rechazar un stock negativo o decimal', () => {
    mostrar();
    completarFormulario();

    escribir(/^Stock \*/, '-1');
    enviar();
    expect(screen.getByRole('alert').textContent)
      .toBe('El stock debe ser un número entero mayor o igual a 0');

    escribir(/^Stock \*/, '2.5');
    enviar();
    expect(guardarSpy).not.toHaveBeenCalled();
  });

  it('debe quitar el error cuando el usuario corrige un campo', () => {
    mostrar();
    enviar();
    expect(screen.getByRole('alert')).toBeTruthy();

    escribir(/^Código/, 'AB001');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('debe cargar los datos del producto y bloquear el código al editar', () => {
    mostrar({
      esEdicion: true,
      productoInicial: {
        codigo: 'GT001',
        nombre: 'Guitarra Acústica Yamaha',
        descripcion: '',
        precio: 89990,
        stock: 12,
        stockCritico: 3,
        categoria: 'Guitarras Acústicas',
        imagen: '/img/gt001.jpg'
      }
    });

    expect(screen.getByLabelText(/^Código/).readOnly).toBe(true);
    expect(screen.getByLabelText(/^Código/).value).toBe('GT001');
    expect(screen.getByLabelText(/^Precio/).value).toBe('89990');
    expect(screen.getByLabelText(/^Stock crítico/).value).toBe('3');
    expect(screen.getByRole('button', { name: 'Guardar cambios' })).toBeTruthy();
  });

  it('debe mantener una categoría antigua que ya no está en la lista', () => {
    mostrar({
      esEdicion: true,
      productoInicial: { codigo: 'MC001', categoria: 'Micrófonos' }
    });

    expect(screen.getByRole('option', { name: 'Micrófonos' })).toBeTruthy();
  });

  it('debe mostrar el error que llega desde la página', () => {
    mostrar({ error: 'Ya existe un producto con el código GT001' });

    expect(screen.getByRole('alert').textContent)
      .toBe('Ya existe un producto con el código GT001');
  });

  it('debe avisar al cancelar', () => {
    mostrar();

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(cancelarSpy).toHaveBeenCalledTimes(1);
  });
});