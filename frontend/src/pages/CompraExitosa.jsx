
import { Link, useLocation } from 'react-router-dom';

export default function CompraExitosa() {
  const { state } = useLocation();
  const pedido = state?.pedido;

  return (
    <main className="container py-5 text-center">
      <h1 className="text-white mb-4">¡Compra exitosa!</h1>

      <div className="card p-4 mx-auto" style={{ maxWidth: '550px' }}>
        <h2 className="text-success">Pedido confirmado</h2>
        <p>Tu compra se ha registrado correctamente.</p>

        {pedido && (
          <>
            <p><strong>Número de pedido:</strong> {pedido.id}</p>
            <p>
              <strong>Total:</strong> {pedido.total.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP'
              })}
            </p>
          </>
        )}

        <Link to="/productos" className="btn btn-primary mt-3">
          Volver a productos
        </Link>
      </div>
    </main>
  );
}
