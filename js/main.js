let productos = [
  { id: 1, nombre: "Crema hidratante", precio: 20000 },
  { id: 2, nombre: "Mascarilla facial", precio: 15000 },
  { id: 3, nombre: "Esencia facial", precio: 2000 },
  { id: 4, nombre: "Exfoliante corporal", precio: 25000 },
  { id: 5, nombre: "Crema para manos", precio: 10000 },
  { id: 6, nombre: "Jabon limpiador", precio: 6000 },
  { id: 7, nombre: "Locion corporal", precio: 9000 },
  { id: 8, nombre: "Base de maquillaje", precio: 3000 },
  { id: 9, nombre: "Polvo fijador", precio: 15900 },
  { id: 10, nombre: "Rimel", precio: 12000 }
];

let carrito = [];

function agregarAlCarrito(productId) {
  let producto = productos.find(p => p.id === productId);
  if (producto) {
    let cantidad = parseInt(prompt(`¿Cuantas unidades de ${producto.nombre} deseas agregar al carrito?`));
    if (cantidad > 0) {
      carrito.push({ producto: producto, cantidad: cantidad });
    } else {
      mostrarMensaje("Debe ingresar una cantidad valida");
    }
  } else {
    mostrarMensaje("Producto no encontrado");
  }
}

function eliminarDelCarrito(productId) {
  let index = carrito.findIndex(p => p.producto.id === productId);
  if (index!== -1) {
    carrito.splice(index, 1);
  } else {
    mostrarMensaje("Producto no encontrado en el carrito");
  }
}

function filtrarProductos(nombre) {
  let resultados = productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
  if (resultados.length > 0) {
    let mensaje = "Resultados de la busqueda:\n";
    resultados.forEach(p => {
      mensaje += `${p.nombre} - $${p.precio}\n`;
    });
    mostrarMensaje(mensaje);
  } else {
    mostrarMensaje("No se encontraron productos con ese nombre");
  }
}

function ordenarProductosAlfabetico() {
  productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  let mensaje = "Productos ordenados alfabeticamente:\n";
  productos.forEach(p => {
    mensaje += `${p.nombre} - $${p.precio}\n`;
  });
  mostrarMensaje(mensaje);
}

function calcularTotal() {
  let total = 0;
  carrito.forEach(p => {
    total += p.cantidad * p.producto.precio;
  });
  return total;
}

function mostrarCarrito() {
  let mensaje = "Carrito de compras:\n";
  carrito.forEach(p => {
    mensaje += `${p.producto.nombre} x ${p.cantidad} = $${p.cantidad * p.producto.precio}\n`;
  });
  mensaje += `Total: $${calcularTotal()}`;
  mostrarMensaje(mensaje);
}

let opcion = parseInt(prompt("¿Que deseas hacer?\n1. Agregar producto al carrito\n2. Eliminar producto del carrito\n3. Filtrar productos por nombre\n4. Ordenar productos alfabeticamente\n5. Mostrar carrito\n6. Salir al catalogo"));

while (opcion!== 6) {
  switch (opcion) {
    case 1:
      let productId = parseInt(prompt("Ingrese el ID del producto que deseas agregar al carrito (1-10)"));
      if (productId >= 1 && productId <= 10) {
        agregarAlCarrito(productId);
      } else {
        mostrarMensaje("ID de producto invalido");
      }
      break;
    case 2:
      let eliminarId = parseInt(prompt("Ingrese el ID del producto que deseas eliminar del carrito (1-10)"));
      if (eliminarId >= 1 && eliminarId <= 10) {
        eliminarDelCarrito(eliminarId);
      } else {
        mostrarMensaje("ID de producto invalido");
      }
      break;
    case 3:
      let nombre = prompt("Ingrese el nombre del producto que deseas filtrar");
      filtrarProductos(nombre);
      break;
    case 4:
      ordenarProductosAlfabetico();
      break;
    case 5:
      mostrarCarrito();
      break;
    default:
      mostrarMensaje("Opcion invalida");
      break;
  }

  opcion = parseInt(prompt("¿Que deseas hacer?\n1. Agregar producto al carrito\n2. Eliminar producto del carrito\n3. Filtrar productos por nombre\n4. Ordenar productos alfabeticamente\n5. Mostrar carrito\n6. Salir al catalogo"));
}

function mostrarMensaje(mensaje) {
  alert(mensaje);
}