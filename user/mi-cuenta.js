const usuarioActivo =
JSON.parse(
localStorage.getItem(
"usuarioActivo"
)
);

if(!usuarioActivo){

window.location.href =
"../auth/login.html";

}

document
.getElementById(
"usuarioInfo"
)
.innerHTML = `

<div class="info">

<strong>Nombre:</strong>
${usuarioActivo.nombre}

</div>

<div class="info">

<strong>Correo:</strong>
${usuarioActivo.email}

</div>

`;

const pedidos =
JSON.parse(
localStorage.getItem(
"pedidos"
)
) || [];

const misPedidos =
pedidos.filter(

pedido =>

pedido.email ===
usuarioActivo.email

);

document
.getElementById(
"totalPedidos"
)
.textContent =
misPedidos.length;

let totalGastado = 0;

misPedidos.forEach(
pedido=>{

totalGastado +=
pedido.total;

});

document
.getElementById(
"totalGastado"
)
.textContent =
"$" +
totalGastado.toFixed(2);

const pedidosDiv =
document.getElementById(
"pedidos"
);

if(
misPedidos.length === 0
){

pedidosDiv.innerHTML = `

<p>
Todavía no tienes pedidos.
</p>

`;

}else{

misPedidos
.slice()
.reverse()
.forEach(
pedido=>{

let productosHTML = "";

pedido.productos.forEach(
producto=>{

productosHTML += `

<div class="product">

• ${producto.nombre}
x ${producto.cantidad}

</div>

`;

});

pedidosDiv.innerHTML += `

<div class="order">

<p>

<strong>Fecha:</strong>

${pedido.fecha}

</p>

<p>

<strong>Método de Pago:</strong>

${pedido.metodoPago}

</p>

<p>
  
  <strong>Estado:</strong>
  
  <span style="
font-weight:bold;
color:
${pedido.estadoPedido === 'Entregado' ? 'green' :
pedido.estadoPedido === 'Enviado' ? 'blue' :
pedido.estadoPedido === 'Procesando' ? 'orange' :
'red'};
">
  
    ${pedido.estadoPedido || "Pendiente"}
    
  </span>
  
</p>

${productosHTML}

<div class="total">

Total:
$${pedido.total}

</div>

</div>

`;

});

}

function logout(){

localStorage.removeItem(
"usuarioActivo"
);

window.location.href =
"../auth/login.html";

}
