import { useState } from 'react';
import { consultarCategorias } from '../services/categoriaService.js';

export default function FormularioProducto({
  productoInicial = {},
  onGuardar,
  onCancelar,
  esEdicion = false,
  error = ''
}) {
  const [categorias] = useState(consultarCategorias);

  const [datos, setDatos] = useState({
    codigo: productoInicial.codigo ?? '',
    nombre: productoInicial.nombre ?? '',
    descripcion: productoInicial.descripcion ?? '',
    precio: productoInicial.precio ?? '',
    stock: productoInicial.stock ?? '',
    stockCritico: productoInicial.stockCritico ?? '',
    categoria: productoInicial.categoria ?? '',
    imagen: productoInicial.imagen ?? ''
  });

  const [errorLocal, setErrorLocal] = useState('');

  const nombresCategorias = categorias.map((c) => c.nombre);

  // si el producto tiene una categoría que ya no existe, se mantiene como opción
  const categoriaAntigua =
    productoInicial.categoria &&
    !nombresCategorias.includes(productoInicial.categoria)
      ? [productoInicial.categoria]
      : [];

  const opcionesCategoria = [...nombresCategorias, ...categoriaAntigua];

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrorLocal('');
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorLocal('');

    if (
      !String(datos.codigo).trim() ||
      !String(datos.nombre).trim() ||
      !datos.categoria
    ) {
      setErrorLocal('Código, nombre y categoría son obligatorios');
      return;
    }

    const precio = Number(datos.precio);
    if (datos.precio === '' || !Number.isFinite(precio) || precio <= 0) {
      setErrorLocal('El precio debe ser un número mayor a 0');
      return;
    }

    const stock = Number(datos.stock);
    if (datos.stock === '' || !Number.isInteger(stock) || stock < 0) {
      setErrorLocal('El stock debe ser un número entero mayor o igual a 0');
      return;
    }

    onGuardar({
      codigo: String(datos.codigo).trim(),
      nombre: String(datos.nombre).trim(),
      descripcion: String(datos.descripcion).trim(),
      precio,
      stock,
      stockCritico: datos.stockCritico === '' ? null : Number(datos.stockCritico),
      categoria: datos.categoria,
      imagen: String(datos.imagen).trim()
    });
  };

  return (
    <form className="admin-form" onSubmit={manejarEnvio} noValidate>
      <label htmlFor="codigo">Código *</label>
      <input
        id="codigo"
        name="codigo"
        placeholder="GT001"
        value={datos.codigo}
        onChange={manejarCambio}
        readOnly={esEdicion}
        maxLength={20}
      />

      <label htmlFor="nombre">Nombre *</label>
      <input
        id="nombre"
        name="nombre"
        value={datos.nombre}
        onChange={manejarCambio}
        maxLength={100}
      />

      <label htmlFor="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        rows={3}
        value={datos.descripcion}
        onChange={manejarCambio}
        maxLength={500}
      />

      <label htmlFor="precio">Precio *</label>
      <input
        id="precio"
        name="precio"
        type="number"
        min="1"
        value={datos.precio}
        onChange={manejarCambio}
      />

      <label htmlFor="stock">Stock *</label>
      <input
        id="stock"
        name="stock"
        type="number"
        min="0"
        value={datos.stock}
        onChange={manejarCambio}
      />

      <label htmlFor="stockCritico">Stock crítico (opcional)</label>
      <input
        id="stockCritico"
        name="stockCritico"
        type="number"
        min="0"
        value={datos.stockCritico}
        onChange={manejarCambio}
      />

      <label htmlFor="categoria">Categoría *</label>
      <select
        id="categoria"
        name="categoria"
        value={datos.categoria}
        onChange={manejarCambio}
      >
        <option value="">Selecciona una categoría</option>
        {opcionesCategoria.map((nombre) => (
          <option key={nombre} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>

      <label htmlFor="imagen">Imagen (ruta, ej: /img/gt001.jpg)</label>
      <input
        id="imagen"
        name="imagen"
        value={datos.imagen}
        onChange={manejarCambio}
      />

      {(errorLocal || error) && (
        <p className="error-msg" role="alert">
          {errorLocal || error}
        </p>
      )}

      <div className="admin-botones">
        <button type="submit">
          {esEdicion ? 'Guardar cambios' : 'Guardar producto'}
        </button>

        <button
          type="button"
          className="admin-btn-cancelar"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}