let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaProductos = document.getElementById('lista-productos');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const carritoSeccion = document.getElementById('carrito');
const btnPagar = document.getElementById('btn-pagar');
const buscador = document.getElementById('buscador');


fetch('../productos/productos.json')
  .then(response => response.json())
  .then(data => {
    mostrarProductos(data);
    agregarListenersAgregarCarrito();
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });

function mostrarProductos(productos) {
  listaProductos.innerHTML = '';

  productos.forEach(producto => {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

    col.innerHTML = `
      <div class="card producto-card" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precioPorKilo}">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p><strong>$${producto.precioPorKilo} /kg</strong></p>
          <input type="number" min="0.1" step="0.1" class="form-control cantidad-kilos mb-2" placeholder="Cantidad (kg)">
          <button class="btn btn-primary agregar-carrito">Agregar al carrito</button>
        </div>
      </div>
    `;

    listaProductos.appendChild(col);
  });
}

function agregarListenersAgregarCarrito() {
  listaProductos.addEventListener('click', function (e) {
    if (e.target.classList.contains('agregar-carrito')) {
      const card = e.target.closest('.producto-card');
      const id = card.dataset.id;
      const nombre = card.dataset.nombre;
      const precio = parseFloat(card.dataset.precio);
      const inputKilos = card.querySelector('.cantidad-kilos');
      const kilos = parseFloat(inputKilos.value);

      if (!kilos || kilos <= 0) {
        alert('Por favor, ingresá una cantidad válida de kilos');
        return;
      }

      const productoExistente = carrito.find(item => item.id === id);

      if (productoExistente) {
        productoExistente.kilos += kilos;
      } else {
        carrito.push({ id, nombre, precio, kilos });
      }

      inputKilos.value = '';
      guardarCarrito();
      actualizarCarrito();
    }
  });
}

function actualizarCarrito() {
  carritoLista.innerHTML = '';

  let total = 0;

  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `${producto.nombre} - ${producto.kilos.toFixed(2)} kg - $${(producto.precio * producto.kilos).toFixed(2)}`;
    carritoLista.appendChild(li);
    total += producto.precio * producto.kilos;
  });

  carritoTotal.textContent = `Total: $${total.toFixed(2)}`;
  carritoSeccion.classList.remove('d-none');
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

btnPagar.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  let resumen = 'Resumen de tu compra:\n\n';
  carrito.forEach(producto => {
    resumen += `• ${producto.nombre}: ${producto.kilos.toFixed(2)} kg - $${(producto.precio * producto.kilos).toFixed(2)}\n`;
  });
  resumen += `\nTotal: $${carrito.reduce((acc, p) => acc + (p.precio * p.kilos), 0).toFixed(2)}`;

  alert(resumen);

  carrito = [];
  guardarCarrito();
  actualizarCarrito();
  carritoSeccion.classList.add('d-none');
});

buscador.addEventListener('input', () => {
  const termino = buscador.value.toLowerCase();
  const productos = document.querySelectorAll('.producto-card');

  productos.forEach(producto => {
    const nombre = producto.dataset.nombre.toLowerCase();
    if (nombre.includes(termino)) {
      producto.closest('.col-12').style.display = 'block';
    } else {
      producto.closest('.col-12').style.display = 'none';
    }
  });
});

if (carrito.length > 0) {
  actualizarCarrito();
}
