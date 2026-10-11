import { useState, useMemo } from 'react';
import ProductoCard from '../components/ProductoCard.jsx';
import { consultarProductos } from '../services/productoService.js';
import { agregarAlCarrito } from '../services/carritoService.js';

export default function Productos() {
  const [productos] = useState(consultarProductos);
  const [aviso, setAviso] = useState(null);

  // --- NUEVOS ESTADOS PARA LOS FILTROS ---
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todas');
  const [orden, setOrden] = useState(''); // 'asc' o 'desc'

  const manejarAgregar = (codigo) => {
    try {
      agregarAlCarrito(codigo);
      setAviso({ tipo: 'ok', texto: 'Producto agregado al carrito correctamente' });
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    }
  };

  // --- OBTENER CATEGORÍAS ÚNICAS DINÁMICAMENTE ---
  const categoriasDisponibles = useMemo(() => {
    const cats = productos.map((p) => p.categoria).filter(Boolean);
    return ['todas', ...new Set(cats)];
  }, [productos]);

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
  const productosFiltrados = useMemo(() => {
    return productos
      .filter((producto) => {
        const nombreProducto = producto.nombre || producto.titulo || '';
        const coincideNombre = nombreProducto.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoria === 'todas' || producto.categoria === categoria;
        return coincideNombre && coincideCategoria;
      })
      .sort((a, b) => {
        if (orden === 'asc') return a.precio - b.precio;
        if (orden === 'desc') return b.precio - a.precio;
        return 0;
      });
  }, [productos, busqueda, categoria, orden]);

  // --- FUNCIÓN PARA LIMPIAR FILTROS ---
  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoria('todas');
    setOrden('');
  };

  return (
    <section className="contenedor-productos">
      <h1 className="cart-title">Catálogo de Productos</h1>

      {/* --- BARRA DE FILTROS Y BÚSQUEDA --- */}
      <div className="filtros-container" style={{ 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap', 
        maxWidth: '1200px', 
        margin: '0 auto 2rem', 
        padding: '0 1rem' 
      }}>
        {/* Búsqueda por nombre */}
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #ccc', flex: '1', minWidth: '200px' }}
        />

        {/* Selección de categoría */}
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          style={{ padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #ccc', textTransform: 'capitalize' }}
        >
          {categoriasDisponibles.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'todas' ? 'Todas las categorías' : cat}
            </option>
          ))}
        </select>

        {/* Ordenar precios */}
        <select 
          value={orden} 
          onChange={(e) => setOrden(e.target.value)}
          style={{ padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a mayor ($)</option>
          <option value="desc">Mayor a menor ($)</option>
        </select>

        {/* Botón limpiar filtros */}
        <button 
          onClick={limpiarFiltros}
          style={{ padding: '0.6rem 1.2rem', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Limpiar filtros
        </button>
      </div>

      {aviso && (
        <p
          role={aviso.tipo === 'error' ? 'alert' : 'status'}
          style={{
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
            padding: '0.8rem 1rem',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: aviso.tipo === 'error' ? '#b42318' : '#2e7d32',
          }}
        >
          {aviso.texto}
        </p>
      )}

      {/* --- LISTADO DE PRODUCTOS O AVISO SIN RESULTADOS --- */}
      {productosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#fff' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
          <button 
            onClick={limpiarFiltros}
            style={{ padding: '0.6rem 1.2rem', background: '#fff', color: '#111', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.codigo}
              producto={producto}
              onAgregar={manejarAgregar}
            />
          ))}
        </div>
      )}
    </section>
  );
}