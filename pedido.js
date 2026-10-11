const pedido =
JSON.parse(
localStorage.getItem(
"ultimoPedido"
)
);

const pedidoInfo =
document.getElementById(
"pedidoInfo"
);

if(!pedido){

pedidoInfo.innerHTML = `

<h2>
No se encontró ningún pedido.
</h2>

`;

}else{

let productosHTML = "";

pedido.productos.forEach(
item=>{

productosHTML += `

<div class="producto">

<strong>

${item.nombre}

</strong>

<br>

Cantidad:
${item.cantidad}

<br>

Precio:
$${item.precio}

<br>

Subtotal:
$${item.precio * item.cantidad}

</div>

`;

});

const numeroPedido =

"AB-" +

Math.floor(

100000 +
Math.random() * 900000

);

pedidoInfo.innerHTML = `

<div class="info">

<p>

Número de Pedido:

<span class="numero">

${numeroPedido}

</span>

</p>

<p>

Cliente:
${pedido.cliente}

</p>

<p>

Correo:
${pedido.email}

</p>

<p>

Dirección:
${pedido.direccion}

</p>

<p>

Ciudad:
${pedido.ciudad}

</p>

<p>

Estado:
${pedido.estado}

</p>

<p>

Método de Pago:
${pedido.metodoPago}

</p>

<p>

Fecha:
${pedido.fecha}

</p>

<div class="estado">

⏳ Pendiente

</div>

</div>

<h2>

Productos Comprados

</h2>

${productosHTML}

<div class="total">

Total Pagado:
$${pedido.total}

</div>

`;

}
