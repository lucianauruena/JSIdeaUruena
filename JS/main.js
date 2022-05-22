let carrito = [];
let button = document.querySelector(".btn btn-primary");
let contenedorCarrito = document.querySelector("#contenedorCarrito");
let contenedorProductos = document.querySelector(`.contenedorProductos`);
let contenedorCarro = document.querySelector("#contenedorCarro");
let total = document.querySelector("#precioTotal");
let miModal = document.querySelector(".modal-body");

class Producto {
    constructor(id, nombre, precio, Img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.Img = Img;
        this.cantidad = 1;
    }
}

productos.forEach((producto) => {
    const articulo = document.createElement("article");
    articulo.classList.add(`card`, `col-3`, `m-3`);
    articulo.id = `${producto.id}`;
    articulo.cant = `${producto.cantidad}`;
    articulo.innerHTML = `
    <img src="${producto.Img}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
         <p class="card-text"> ${producto.descripcion}</p>
         <p id="costo" class="card-text">$${producto.precio}</p>  
         <button id="agregar${producto.id}"  class="btn btn-primary">Agregar al carrito</button>
    </div>`;
contenedorProductos.append(articulo);

const boton = document.getElementById(`agregar${producto.id}`);
boton.addEventListener("click", () => {
agregarProducto(producto.id);
storage();
});
});


  const agregarProducto = (idProd) => {
    const art = productos.find((prod) => prod.id === idProd);
    art.cantidad >= 1
    const existe = carrito.some((prod) => prod.id === idProd);
    if (existe) {
       carrito.map((producto) => {
        if (producto.id === idProd) {
          producto.cantidad++;
          //return producto;
        } else {
        //  return producto;
        }
      });
    } else {
      carrito.push(art);
    }
    actualizarCarrito();
    swal({
      position: "top-end",
      icon: "success",
      title: "Producto agregado",
      timer: 1100,
    })
  }
  
  const borrarDelCarrito = (idProd) => {
    
    carrito.map(c =>{
      if(c.id === idProd && c.cantidad >= 0 ){
        c.cantidad --;
      }
    })
    const item = carrito.find((prod) => prod.id === idProd);
    if(item.cantidad === 0){
      const index = carrito.indexOf(item);
      carrito.splice(index, 1);
    }
    actualizarCarrito();
  }
  
  const actualizarCarrito = () => {
    
    miModal.innerHTML = ``;
    carrito.forEach((prod) => {
      let div = document.createElement("div");
        div.className = "productoAgregado";
        div.innerHTML = `
          <img src="${prod.Img}"</img>
          <p> ${prod.descripcion}</p>
          <p>$${prod.precio}</p>
          <p>${prod.cantidad}</p>
          <button type="button" class="btnBorrar" id="borrar${prod.id}">  </button>
      `
      miModal.append(div);
      const borrar = document.getElementById(`borrar${prod.id}`)
      borrar.addEventListener("click", () => {
        borrarDelCarrito(prod.id);
      })
    })
  
    total.innerText = precioFinal();
    contenedorCarro.innerText = carrito.length;
  }
   let storage = () => {
    localStorage.setItem("carroCompra", JSON.stringify(carrito));
  } 
  let precioFinal = () => {
    let precioGeneral = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    return precioGeneral;
  }
