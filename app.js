let productos =
  JSON.parse(
    localStorage.getItem("productos")
  ) || [];

let carrito =
  JSON.parse(
    localStorage.getItem("carrito")
  ) || [];

let favoritos =
  JSON.parse(
    localStorage.getItem("favoritos")
  ) || [];

const contenedor =
  document.getElementById("productos");

const count =
  document.getElementById("count");

function actualizarContador() {
  
  count.textContent =
    carrito.reduce(
      (acc, item) =>
      acc + item.cantidad,
      0
    );
}


const carruseles = {};

function cambiarImagen(
  index,
  direccion
) {
  
  const producto =
    productos[index];
  
  if (
    carruseles[index] === undefined
  ) {
    
    carruseles[index] = 0;
    
  }
  
  carruseles[index] += direccion;
  
  if (
    carruseles[index] >=
    producto.imagenes.length
  ) {
    
    carruseles[index] = 0;
    
  }
  
  if (
    carruseles[index] < 0
  ) {
    
    carruseles[index] =
      producto.imagenes.length - 1;
    
  }
  
  document.getElementById(
    `img-${index}`
  ).src =
  producto.imagenes[
    carruseles[index]
  ];

}

function renderizar(lista) {
  
  contenedor.innerHTML = "";
  
  lista.forEach((producto,index)=>{
    
    let estado = "";
    
    if (producto.stock === 0) {
      
      estado =
        "🔴 Agotado";
      
    } else if (producto.stock <= 5) {
      
      estado =
        "🟠 Últimas unidades";
      
    } else {
      
      estado =
        "🟢 Disponible";
      
    }
    
    contenedor.innerHTML += `

<div class="card">

<div class="galeria">

<button
class="flecha izquierda"
onclick="
cambiarImagen(
${index},
-1
)">
◀
</button>

<img
id="img-${index}"

src="${
producto.imagenes
? producto.imagenes[0]
: producto.imagen
}"

class="principal">

<button
class="flecha derecha"
onclick="
cambiarImagen(
${index},
1
)">
▶
</button>

</div>

</div>


<div class="info">

<h3>
${producto.nombre}
</h3>

<div class="precio">
$${producto.precio}
</div>

<div class="stock">
Stock:
${producto.stock}
</div>

<div>
${estado}
</div>

${
producto.stock > 0

?

`<button
class="agregar"
onclick="
agregarCarrito(
'${producto.nombre}',
${producto.precio}
)">
Agregar al carrito
</button>`

:

`<button disabled>
Agotado
</button>`
}

<button
class="favorito"
onclick="
agregarFavorito(
'${producto.nombre}'
)">
❤️ Favorito
</button>

</div>

</div>

`;
    
  });
  
}

function agregarCarrito(
  nombre,
  precio
) {
  
  const producto =
    productos.find(
      p => p.nombre === nombre
    );
  
  const item =
    carrito.find(
      p => p.nombre === nombre
    );
  
  const cantidadActual =
    item ? item.cantidad : 0;
  
  if (
    cantidadActual >= producto.stock
  ) {
    
    alert(
      "No hay más unidades"
    );
    
    return;
    
  }
  
  if (item) {
    
    item.cantidad++;
    
  } else {
    
    carrito.push({
      
      nombre,
      precio,
      cantidad: 1
      
    });
    
  }
  
  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );
  
  actualizarContador();
  
}

function agregarFavorito(
  nombre
) {
  
  if (
    !favoritos.includes(nombre)
  ) {
    
    favoritos.push(nombre);
    
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
    
    alert(
      "Agregado a favoritos"
    );
    
  }
  
}
  
  const buscar =
  document.getElementById("buscar");
  
  
  buscar.addEventListener("input", () => {
    
    const texto =
      buscar.value.toLowerCase();
    
    const filtrados =
      productos.filter(
        p =>
        p.nombre
        .toLowerCase()
        .includes(texto)
      );

    renderizar(filtrados);
    
  });

actualizarContador();

renderizar(productos);

