
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const imagenes = document.getElementById("imagenes");
const categoria = document.getElementById("categoria");
const stock = document.getElementById("stock");
const rating = document.getElementById("rating");
const oferta = document.getElementById("oferta");

const contenedor = document.getElementById("productos");
const modalEliminar = document.getElementById("modalEliminar");

let productos = JSON.parse(
  localStorage.getItem("productos")
) || [];

let productoEliminar = null;

// Guardar productos en localStorage
function guardarEnStorage() {
  localStorage.setItem(
    "productos",
    JSON.stringify(productos)
  );
}

// Agregar un producto
function guardarProducto() {
  const nombreProducto = nombre.value.trim();
  const precioProducto = Number(precio.value);
  const listaImagenes = imagenes.value
    .split(",")
    .map(url => url.trim())
    .filter(url => url !== "");

  const categoriaProducto = categoria.value.trim();
  const stockProducto = Number(stock.value);
  const ratingProducto = Number(rating.value);
  const ofertaProducto = Number(oferta.value);

  // Validar campos obligatorios
  if (
    !nombreProducto ||
    precio.value === "" ||
    imagenes.value.trim() === "" ||
    !categoriaProducto ||
    stock.value === ""
  ) {
    alert("Completa todos los campos obligatorios.");
    return;
  }

  if (
    !Number.isFinite(precioProducto) ||
    precioProducto < 0 ||
    !Number.isFinite(stockProducto) ||
    stockProducto < 0 ||
    !Number.isInteger(stockProducto)
  ) {
    alert("El precio y el stock deben ser válidos.");
    return;
  }

  if (
    rating.value !== "" &&
    (!Number.isFinite(ratingProducto) ||
      ratingProducto < 0 ||
      ratingProducto > 5)
  ) {
    alert("La valoración debe estar entre 0 y 5.");
    return;
  }

  if (
    oferta.value !== "" &&
    (!Number.isFinite(ofertaProducto) ||
      ofertaProducto < 0 ||
      ofertaProducto > 100)
  ) {
    alert("La oferta debe estar entre 0 y 100%.");
    return;
  }

  // Crear el producto
  const producto = {
    id: Date.now().toString() +
      Math.random().toString(36).slice(2, 7),
    nombre: nombreProducto,
    precio: precioProducto,
    imagenes: listaImagenes,
    categoria: categoriaProducto,
    stock: stockProducto,
    rating: rating.value === ""
      ? 0
      : ratingProducto,
    oferta: oferta.value === ""
      ? 0
      : ofertaProducto
  };

  productos.push(producto);

  guardarEnStorage();
  mostrarProductos();
  limpiarFormulario();

  alert("¡Producto guardado correctamente!");
}

// Mostrar los productos
function mostrarProductos() {
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    contenedor.innerHTML =
      "<p>No hay productos todavía.</p>";
    return;
  }

  productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "producto";

    // Imagen segura: no insertar HTML con datos del usuario
    const imagen = document.createElement("img");
    imagen.src = producto.imagenes?.[0] || "";
    imagen.alt = producto.nombre;
    imagen.loading = "lazy";
    imagen.onerror = function () {
      this.style.display = "none";
    };

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precioTexto = document.createElement("p");
    precioTexto.textContent =
      "Precio: $" + Number(producto.precio).toFixed(2);

    const categoriaTexto = document.createElement("p");
    categoriaTexto.textContent =
      "Categoría: " + producto.categoria;

    const stockTexto = document.createElement("p");
    stockTexto.textContent =
      "Stock: " + producto.stock;

    const ratingTexto = document.createElement("p");
    ratingTexto.textContent =
      "Valoración: " + producto.rating + "/5";

    const ofertaTexto = document.createElement("p");
    ofertaTexto.textContent =
      "Oferta: " + producto.oferta + "%";

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "🗑 Eliminar";
    botonEliminar.className = "eliminar";

    botonEliminar.addEventListener("click", function () {
      abrirModal(producto.id);
    });

    tarjeta.append(
      imagen,
      titulo,
      precioTexto,
      categoriaTexto,
      stockTexto,
      ratingTexto,
      ofertaTexto,
      botonEliminar
    );

    contenedor.appendChild(tarjeta);
  });
}

// Limpiar el formulario
function limpiarFormulario() {
  nombre.value = "";
  precio.value = "";
  imagenes.value = "";
  categoria.value = "";
  stock.value = "";
  rating.value = "";
  oferta.value = "";
}

// Abrir modal de eliminación
function abrirModal(id) {
  productoEliminar = id;
  modalEliminar.style.display = "flex";
}

// Cerrar modal
function cerrarModal() {
  modalEliminar.style.display = "none";
  productoEliminar = null;
}

// Confirmar eliminación
function confirmarEliminar() {
  if (productoEliminar === null) {
    return;
  }

  productos = productos.filter(
    producto => producto.id !== productoEliminar
  );

  guardarEnStorage();
  mostrarProductos();
  cerrarModal();
}

// Mostrar los productos al abrir la página
mostrarProductos();
