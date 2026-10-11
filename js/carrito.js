
let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];

let productos =
JSON.parse(
localStorage.getItem("productos")
) || [];

const cartItems =
document.getElementById(
"cartItems"
);

const cartTotal =
document.getElementById(
"cartTotal"
);

const itemsCount =
document.getElementById(
"itemsCount"
);

function renderCart(){

cartItems.innerHTML="";

if(carrito.length===0){

cartItems.innerHTML=`

<div class="empty">

<h2>
Your cart is empty
</h2>

<p>
Add some products first.
</p>

</div>

`;

cartTotal.textContent="0";
itemsCount.textContent="0";

return;

}

let total=0;
let cantidad=0;

carrito.forEach(
(item,index)=>{

const producto =
productos.find(

p =>
p.nombre === item.nombre

);

const stock =
producto
? producto.stock
: 0;

const subtotal =
item.precio *
item.cantidad;

total += subtotal;

cantidad += item.cantidad;

cartItems.innerHTML += `

<div class="item">

<img
src="${
producto?.imagenes ||
'https://via.placeholder.com/150'
}">

<div class="info">

<h3>
${item.nombre}
</h3>

<div class="price">
$${item.precio}
</div>

<div class="stock">

Available:
${stock}

</div>

<div class="controls">

<button
class="minus"
onclick="decrease(${index})">

-

</button>

<div class="quantity">

${item.cantidad}

</div>

<button
class="plus"
onclick="increase(${index})">

+

</button>

<button
class="delete"
onclick="removeItem(${index})">

🗑

</button>

</div>

<div class="subtotal">

Subtotal:
$${subtotal}

</div>

</div>

</div>

`;

});

cartTotal.textContent =
total.toFixed(2);

itemsCount.textContent =
cantidad;

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

}

function increase(index){

const item =
carrito[index];

const producto =
productos.find(

p =>
p.nombre === item.nombre

);

if(
item.cantidad >=
producto.stock
){

alert(
"No more stock available"
);

return;

}

item.cantidad++;

renderCart();

}

function decrease(index){

if(
carrito[index].cantidad > 1
){

carrito[index].cantidad--;

}else{

carrito.splice(index,1);

}

renderCart();

}

function removeItem(index){

if(
confirm(
"Remove this item?"
)
){

carrito.splice(index,1);

renderCart();

}

}

function goCheckout(){

if(carrito.length===0){

alert(
"Your cart is empty"
);

return;

}

window.location.href =
"checkout.html";

}

renderCart();
