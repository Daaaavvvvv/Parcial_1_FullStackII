import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioProducto from '../components/FormularioProducto.jsx';
import { agregarProducto } from '../services/productoService.js';

export default function NuevoProducto() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const guardarProducto = (datos) => {
    setError('');

    try {
      agregarProducto(datos);
      navigate('/admin/productos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Nuevo Producto</h1>

      <p className="admin-descripcion">
        Completa los datos para agregar un producto al catálogo.
      </p>

      <FormularioProducto
        onGuardar={guardarProducto}
        onCancelar={() => navigate('/admin/productos')}
        error={error}
      />
    </>
  );
}