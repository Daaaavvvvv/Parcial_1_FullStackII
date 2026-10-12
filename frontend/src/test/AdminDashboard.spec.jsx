import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';

describe('Dashboard de administración', () => {
  const claves = ['productos', 'categorias', 'pedidos', 'sonidoVivo_usuarios'];

  const mostrar = () =>
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

  const tarjeta = (container, ruta) =>
    container.querySelector(`a[href="${ruta}"]`);

  const precio = (valor) =>
    valor.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });

  const pedido = (numero, extra = {}) => ({
    id: `PED-${numero}`,
    fecha: '2026-10-05T15:00:00.000Z',
    comprador: { nombre: `Cliente ${numero}`, correo: 'c@c.cl' },
    total: 10000 * numero,
    estado: 'confirmado',
    productos: [],
    ...extra
  });

  const producto = (numero, stock) => ({
    codigo: `P${numero}`,
    nombre: `Producto ${numero}`,
    descripcion: '',
    precio: 1000,
    stock,
    stockCritico: null,
    categoria: 'Baterías',
    imagen: ''
  });

  beforeEach(() => {
    claves.forEach((clave) => localStorage.removeItem(clave));
    sessionStorage.removeItem('sonidoVivo_sesion');
  });

  afterEach(() => {
    claves.forEach((clave) => localStorage.removeItem(clave));
    sessionStorage.removeItem('sonidoVivo_sesion');
  });

  it('debe saludar con el nombre de la persona que inició sesión', () => {
    sessionStorage.setItem(
      'sonidoVivo_sesion',
      JSON.stringify({ nombreCompleto: 'Ana Pérez', rol: 'Administrador' })
    );
    mostrar();

    expect(screen.getByRole('heading', { name: '¡Hola, Ana!' })).toBeTruthy();
  });

  it('debe saludar como Administrador si no hay sesión', () => {
    mostrar();

    expect(screen.getByRole('heading', { name: '¡Hola, Administrador!' })).toBeTruthy();
  });

  it('debe mostrar los indicadores de productos, stock bajo y categorías', () => {
    const { container } = mostrar();

    expect(tarjeta(container, '/admin/productos').textContent)
      .toBe('Productos5Ver productos');
    expect(tarjeta(container, '/admin/productos/stock-bajo').textContent)
      .toBe('Stock bajo2Ver productos con pocas unidades');
    expect(tarjeta(container, '/admin/categorias').textContent)
      .toBe('Categorías5Administrar categorías');
  });

  it('debe mostrar los indicadores de usuarios, pedidos y ventas', () => {
    localStorage.setItem('sonidoVivo_usuarios', JSON.stringify([
      { run: '1-9', nombreCompleto: 'A', correo: 'a@a.cl', activo: true },
      { run: '2-7', nombreCompleto: 'B', correo: 'b@a.cl', activo: false }
    ]));
    localStorage.setItem('pedidos', JSON.stringify([
      pedido(1),
      pedido(2),
      pedido(3, { estado: 'cancelado' })
    ]));

    const { container } = mostrar();

    expect(tarjeta(container, '/admin/usuarios').textContent)
      .toBe('Usuarios21 activos');
    expect(tarjeta(container, '/admin/pedidos').textContent)
      .toBe('Pedidos3Ver pedidos');
    expect(tarjeta(container, '/admin/reportes').textContent)
      .toBe(`Ventas confirmadas${precio(30000)}Ver reportes`);
  });

  it('debe resaltar el stock bajo solo cuando hay productos con pocas unidades', () => {
    const { container, unmount } = mostrar();

    expect(tarjeta(container, '/admin/productos/stock-bajo').className)
      .toContain('admin-tarjeta-alerta');

    unmount();
    localStorage.setItem('productos', JSON.stringify([producto(1, 50)]));
    const otro = mostrar();

    expect(tarjeta(otro.container, '/admin/productos/stock-bajo').className)
      .not.toContain('admin-tarjeta-alerta');
    expect(screen.getByText('No hay productos con pocas unidades.')).toBeTruthy();
  });

  it('debe listar los productos con pocas unidades con su enlace de edición', () => {
    mostrar();

    const seccion = within(screen.getByLabelText('Productos con pocas unidades'));

    expect(seccion.getByText('GT002')).toBeTruthy();
    expect(seccion.getByText('BT001')).toBeTruthy();
    expect(seccion.queryByText('TC001')).toBeNull();
    expect(seccion.getAllByRole('link', { name: 'Editar' })[0].getAttribute('href'))
      .toBe('/admin/productos/GT002/editar');
  });

  it('debe mostrar como máximo 5 productos con pocas unidades', () => {
    localStorage.setItem(
      'productos',
      JSON.stringify([1, 2, 3, 4, 5, 6, 7].map((n) => producto(n, 1)))
    );
    mostrar();

    const seccion = within(screen.getByLabelText('Productos con pocas unidades'));

    expect(seccion.getAllByRole('row').length).toBe(6);
  });

  it('debe avisar cuando todavía no hay pedidos', () => {
    mostrar();

    expect(screen.getByText('Todavía no hay pedidos registrados.')).toBeTruthy();
  });

  it('debe mostrar los últimos pedidos, del más nuevo al más antiguo', () => {
    localStorage.setItem('pedidos', JSON.stringify([pedido(1), pedido(2), pedido(3)]));
    mostrar();

    const filas = within(screen.getByLabelText('Últimos pedidos')).getAllByRole('row');

    expect(filas.length).toBe(4);
    expect(filas[1].textContent).toContain('PED-3');
    expect(filas[1].textContent).toContain(precio(30000));
    expect(filas[3].textContent).toContain('PED-1');

    const enlace = within(filas[1]).getByRole('link', { name: 'Ver pedido' });
    expect(enlace.getAttribute('href')).toBe('/admin/pedidos/PED-3');
  });

  it('debe mostrar como máximo 5 pedidos', () => {
    localStorage.setItem(
      'pedidos',
      JSON.stringify([1, 2, 3, 4, 5, 6, 7].map((n) => pedido(n)))
    );
    mostrar();

    const filas = within(screen.getByLabelText('Últimos pedidos')).getAllByRole('row');

    expect(filas.length).toBe(6);
  });

  it('debe mostrar valores por defecto si un pedido no trae comprador ni estado', () => {
    localStorage.setItem(
      'pedidos',
      JSON.stringify([{ id: 'PED-9', fecha: '2026-10-05T15:00:00.000Z', total: 5000 }])
    );
    mostrar();

    const fila = within(screen.getByLabelText('Últimos pedidos')).getAllByRole('row')[1];

    expect(fila.textContent).toContain('Sin nombre');
    expect(fila.textContent).toContain('Sin estado');
  });
});