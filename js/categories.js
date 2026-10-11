const productos =
JSON.parse(
localStorage.getItem(
"productos"
)
) || [];

const carrito =
JSON.parse(
localStorage.getItem(
"carrito"
)
) || [];

const contenedor =
document.getElementById(
"productos"
);

function renderizar(lista){

contenedor.innerHTML = "";

if(lista.length === 0){

contenedor.innerHTML = `

<h2>
No hay productos
en esta categoría.
</h2>

`;

return;

}

lista.forEach(producto=>{

contenedor.innerHTML += `

<div class="card">

<img
src="${producto.imagenes}">

<div class="info">

<h3>
${producto.nombre}
</h3>

<p>
Categoría:
${producto.categoria}
</p>

<div class="precio">

$${producto.precio}

</div>

<div class="stock">

Stock:
${producto.stock}

</div>

<p>

⭐ ${producto.rating || 0}

</p>

<button
class="agregar"
onclick="
agregarCarrito(
'${producto.nombre}',
${producto.precio}
)
">

Agregar al carrito

</button>

</div>

</div>

`;

});

}

function filtrar(categoria){

if(categoria === "Todos"){

renderizar(productos);

return;

}

const filtrados =
productos.filter(

p =>
p.categoria === categoria

);

renderizar(filtrados);

}

function agregarCarrito(
nombre,
precio
){

const item =
carrito.find(

p =>
p.nombre === nombre

);

if(item){

item.cantidad++;

}else{

carrito.push({

nombre,
precio,
cantidad:1

});

}

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

alert(
"Producto agregado al carrito"
);

}

renderizar(productos);
 
 