
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerCarrito, calcularTotal } from '../services/carritoService.js';
import { confirmarCompra } from '../services/pedidoService.js';

export default function Checkout() {
  const navigate = useNavigate();
  const [carrito] = useState(obtenerCarrito);
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    entrega: 'retiro',
    direccion: ''
  });

  const [procesando, setProcesando] = useState(false);

  const formatoPrecio = (valor) =>
    Number(valor).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (procesando) return;
    setProcesando(true);

  try {
    const pedido = confirmarCompra(datos);

    navigate('/compra/exitosa', {
      state: { pedido },
      replace: true
    });
  } catch (err) {
    navigate('/compra/error', {
      state: { mensaje: err.message }
    });
  } finally {
    setProcesando(false);
  }
  };

  if (carrito.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h1 className="text-white">Datos de compra</h1>
        <p className="text-white">Tu carrito está vacío.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver productos
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5 checkout-page">
      <h1 className="mb-4">Datos de compra</h1>

      <div className="row g-4">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                className="form-control"
                value={datos.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                className="form-control"
                value={datos.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="entrega" className="form-label">
                Tipo de entrega
              </label>
              <select
                id="entrega"
                name="entrega"
                className="form-select"
                value={datos.entrega}
                onChange={handleChange}
              >
                <option value="retiro">Retiro en tienda</option>
                <option value="despacho">Despacho a domicilio</option>
              </select>
            </div>

            {datos.entrega === 'despacho' && (
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección de despacho
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  value={datos.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={procesando}
            >
              {procesando ? 'Procesando...' : 'Confirmar compra'}
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card p-3">
            <h2 className="h5">Resumen de compra</h2>

            {carrito.map((item) => (
              <div
                key={item.codigo}
                className="d-flex justify-content-between mb-2"
              >
                <span>{item.nombre} × {item.cantidad}</span>
                <span>
                  {formatoPrecio(item.precio * item.cantidad)}
                </span>
              </div>
            ))}

            <hr />
            <h3 className="h5">
              Total: {formatoPrecio(calcularTotal())}
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}