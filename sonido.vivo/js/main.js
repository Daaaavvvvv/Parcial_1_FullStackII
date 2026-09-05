const regionesComunas = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "La Florida", "Ñuñoa", "Vitacura", "La Reina", "San Miguel"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
  "Región de la Araucanía": ["Temuco", "Villarrica", "Angol", "Pucón"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Bulnes"]
};

function cargarRegiones() {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) return;

  Object.keys(regionesComunas).forEach(region => {
    const opcion = document.createElement("option");
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener("change", cargarComunas);
}

function cargarComunas() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

  const region = selectRegion.value;
  if (region && regionesComunas[region]) {
    regionesComunas[region].forEach(comuna => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectComuna.appendChild(opcion);
    });
  }
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = totalItems;
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

document.addEventListener("DOMContentLoaded", cargarRegiones);