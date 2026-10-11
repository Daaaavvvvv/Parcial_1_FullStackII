
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioUsuario from '../components/FormularioUsuario.jsx';
import {
  buscarUsuario,
  editarUsuario
} from '../services/usuarioService.js';

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const usuario = buscarUsuario(id);

  const guardarCambios = (datos) => {
    setError('');

    try {
      editarUsuario(id, datos);
      navigate('/admin/usuarios');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!usuario) {
    return (
      <>
        <h1>Usuario no encontrado</h1>
        <button
          type="button"
          className="btn-nuevo"
          onClick={() => navigate('/admin/usuarios')}
        >
          Volver
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Editar Usuario</h1>

      <p className="admin-descripcion">
        Modifica la información, el rol o el estado del usuario.
      </p>

      <FormularioUsuario
        key={usuario.run}
        usuarioInicial={usuario}
        esEdicion={true}
        onGuardar={guardarCambios}
        onCancelar={() => navigate('/admin/usuarios')}
        error={error}
      />
    </>
  );
}
