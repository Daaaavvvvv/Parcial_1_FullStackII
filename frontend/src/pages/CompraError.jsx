
import { Link, useLocation } from 'react-router-dom';

export default function CompraError() {
  const { state } = useLocation();
  const mensaje = state?.mensaje || 'No fue posible completar la compra.';

  return (
    <main className="container py-5 text-center">
      <h1 className="text-white mb-4">Compra fallida</h1>

      <div className="card p-4 mx-auto" style={{ maxWidth: '550px' }}>
        <h2 className="text-danger">No se pudo procesar el pedido</h2>
        <p>{mensaje}</p>
        <p>Los productos permanecerán en tu carrito.</p>

        <Link to="/carrito" className="btn btn-primary mt-3">
          Volver al carrito
        </Link>
      </div>
    </main>
  );
}
