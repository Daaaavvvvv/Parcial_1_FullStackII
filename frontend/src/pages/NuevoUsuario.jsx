
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioUsuario from '../components/FormularioUsuario.jsx';
import { agregarUsuario } from '../services/usuarioService.js';

export default function NuevoUsuario() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const guardarUsuario = (datos) => {
    setError('');

    try {
      agregarUsuario(datos);
      navigate('/admin/usuarios');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Nuevo Usuario</h1>

      <p className="admin-descripcion">
        Completa los datos para registrar un nuevo usuario.
      </p>

      <FormularioUsuario
        onGuardar={guardarUsuario}
        onCancelar={() => navigate('/admin/usuarios')}
        error={error}
      />
    </>
  );
}
