

const productos = [ 
  { 
    id: 1,
    nombre: "Bola de lomo",
    precio: 3500 },
  { id: 2,
    nombre: "Entraña", 
    precio: 2800 },
  { id: 3,
    nombre: "Cuadrada", 
    precio: 3200 },
  { id: 4,
    nombre: "Carre", 
    precio: 4000 }
];

let carrito = [];

function mostrarProductos() {
  console.log("Productos disponibles:");
  for (let i = 0; i < productos.length; i++) {
      console.log(`${productos[i].id}: ${productos[i].nombre} - $${productos[i].precio} por kg`);
  }
}

function agregarAlCarrito() {
  let seguirComprando = true;

  while (seguirComprando) {
      let lista = "Seleccione un producto ingresando su número:\n";
      for (let i = 0; i < productos.length; i++) {
          lista += `${productos[i].id}. ${productos[i].nombre} - $${productos[i].precio} por kg\n`;
      }

      let seleccion = parseInt(prompt(lista));
      let producto = null;

      for (let i = 0; i < productos.length; i++) {
          if (productos[i].id === seleccion) {
              producto = productos[i];
              break;
          }
      }

      if (producto) {
          let cantidad = parseFloat(prompt(`¿Cuántos kg de ${producto.nombre} desea comprar?`));
          if (!isNaN(cantidad) && cantidad > 0) {
              carrito.push({ ...producto, cantidad });
              alert(`${producto.nombre} agregado al carrito.`);
          } else {
              alert("Cantidad inválida.");
          }
      } else {
          alert("Producto no encontrado.");
      }

      seguirComprando = confirm("¿Desea agregar otro producto?");
  }
}


function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
      total += carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}

function mostrarResumen() {
  console.log("Resumen del carrito:");
  for (let i = 0; i < carrito.length; i++) {
      console.log(`${carrito[i].nombre} - ${carrito[i].cantidad} kg - $${carrito[i].precio * carrito[i].cantidad}`);
  }
  const total = calcularTotal();
  alert(`Gracias por tu compra. El total es $${total}`);
  console.log(`Total a pagar: $${total}`);
}

alert("Bienvenido a Carnicería ");
mostrarProductos();
agregarAlCarrito();
mostrarResumen();
