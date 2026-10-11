import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioProducto from '../components/FormularioProducto.jsx';
import {
  obtenerProducto,
  editarProducto
} from '../services/productoService.js';

export default function EditarProducto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const producto = obtenerProducto(codigo);

  const guardarCambios = (datos) => {
    setError('');

    try {
      editarProducto(codigo, datos);
      navigate('/admin/productos');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!producto) {
    return (
      <>
        <h1>Producto no encontrado</h1>
        <button
          type="button"
          className="btn-nuevo"
          onClick={() => navigate('/admin/productos')}
        >
          Volver
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Editar Producto</h1>

      <p className="admin-descripcion">
        Modifica los datos del producto. El código no se puede cambiar.
      </p>

      <FormularioProducto
        key={producto.codigo}
        productoInicial={producto}
        esEdicion={true}
        onGuardar={guardarCambios}
        onCancelar={() => navigate('/admin/productos')}
        error={error}
      />
    </>
  );
}