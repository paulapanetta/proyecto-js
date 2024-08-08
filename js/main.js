let productos = [
  { id: 1, nombre: "Crema hidratante", precio: 20000, cantidad: 0 },
  { id: 2, nombre: "Mascarilla facial", precio: 15000, cantidad: 0 },
  { id: 3, nombre: "Esencia facial", precio: 2000, cantidad: 0 },
  { id: 4, nombre: "Exfoliante corporal", precio: 25000, cantidad: 0 },
  { id: 5, nombre: "Crema para manos", precio: 10000, cantidad: 0 },
  { id: 6, nombre: "Jabon limpiador", precio: 6000, cantidad: 0 },
  { id: 7, nombre: "Locion corporal", precio: 9000, cantidad: 0 },
  { id: 8, nombre: "Base de maquillaje", precio: 3000, cantidad: 0 },
  { id: 9, nombre: "Polvo fijador", precio: 15900, cantidad: 0 },
  { id: 10, nombre: "Rimel", precio: 12000, cantidad: 0 }
];

let carrito = [];

function mostrarProductos() {
  const listaProductos = document.getElementById('lista-carrito');
  listaProductos.innerHTML = '';
  productos.forEach(producto => {
    const item = document.createElement('li');
    item.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <p>ID: ${producto.id}</p>
      <button class="agregar-al-carrito" id="agregar-${producto.id}">Agregar al carrito</button>
    `;
    const botonAgregar = item.querySelector('button');
    botonAgregar.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
    });
    listaProductos.appendChild(item);
  });
}

function agregarAlCarrito(productId) {
  const producto = productos.find(p => p.id === productId);
  if (producto) {
    const cantidad = parseInt(prompt(`¿Cuántas unidades de ${producto.nombre} deseas agregar al carrito?`));
    if (cantidad > 0) {
      const itemCarrito = carrito.find(item => item.producto.id === productId);
      if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
      } else {
        carrito.push({ producto, cantidad });
      }
      mostrarCarrito();
    } else {
      alert('Debe ingresar una cantidad válida');
    }
  } else {
    alert('Producto no encontrado');
  }
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(item => {
    const producto = item.producto;
    const cantidad = item.cantidad;
    const total = producto.precio * cantidad;

    const itemCarrito = document.createElement('li');
    itemCarrito.classList.add('carrito');
    itemCarrito.innerHTML = `
      <h3>${producto.nombre} x ${cantidad}</h3>
      <p>Total: $${total.toFixed(2)}</p>
      <button id="eliminar-${producto.id}">Eliminar del carrito</button>
    `;
    listaCarrito.appendChild(itemCarrito);

    const eliminarButton = itemCarrito.querySelector(`#eliminar-${producto.id}`);
    eliminarButton.addEventListener('click', () => {
      eliminarDelCarrito(producto.id);
    });
  });

  let totalCarrito = 0;
  carrito.forEach(item => {
    totalCarrito += item.producto.precio * item.cantidad;
  });
  const totalCarritoElemento = document.getElementById('total-carrito');
  totalCarritoElemento.innerText = `Total: $${totalCarrito.toFixed(2)}`;
}

function eliminarDelCarrito(productId) {
  const index = carrito.findIndex(item => item.producto.id === productId);
  if (index !== -1) {
    if (confirm(`¿Estás seguro de que deseas eliminar ${carrito[index].producto.nombre} del carrito?`)) {
      carrito.splice(index, 1);
      mostrarCarrito();
    }
  } else {
    alert('Producto no encontrado en el carrito');
  }
}

const vaciarCarrito = document.getElementById('vaciar-carrito');
if (vaciarCarrito) {
  vaciarCarrito.addEventListener('click', () => {
    carrito = [];
    mostrarCarrito();
  });
}

mostrarProductos();