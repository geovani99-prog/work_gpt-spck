const pedidos =
JSON.parse(
localStorage.getItem(
"pedidos"
)
) || [];

const usuarios =
JSON.parse(
localStorage.getItem(
"usuarios"
)
) || [];

const productos =
JSON.parse(
localStorage.getItem(
"productos"
)
) || [];

let ventasTotales = 0;

pedidos.forEach(
pedido=>{

ventasTotales +=
pedido.total;

}
);

document
.getElementById("ventas")
.textContent =
"$" +
ventasTotales
.toFixed(2);

document
.getElementById("pedidos")
.textContent =
pedidos.length;

document
.getElementById("usuarios")
.textContent =
usuarios.length;

document
.getElementById("productos")
.textContent =
productos.length;

const ranking =
document.getElementById(
"ranking"
);

productos

.sort(
(a,b)=>
b.vendidos -
a.vendidos
)

.forEach(
producto=>{

ranking.innerHTML += `

<tr>

<td class="top">

${producto.nombre}

</td>

<td>

${producto.vendidos}

</td>

<td>

${producto.stock}

</td>

</tr>

`;

});

const ultimosPedidos =
document.getElementById(
"ultimosPedidos"
);

pedidos

.slice()

.reverse()

.forEach(
pedido=>{

ultimosPedidos.innerHTML += `

<tr>

<td>

${pedido.cliente}

</td>

<td>

${pedido.fecha}

</td>

<td>

$${pedido.total}

</td>

<td>

${pedido.metodoPago}

</td>

</tr>

`;

});
