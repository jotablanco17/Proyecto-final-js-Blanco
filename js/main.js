function losProductos() {

    // array vacio de productos--------------------------------------
    stock = []

    // clase constructora---------------------------------------------
    class productos {
        constructor(nombre, precio, id,) {
            this.nombre = nombre;
            this.precio = precio;
            this.id = id;
        }
    }

    // productos-------------------------------------------------
    stock.push(new productos('remera', 2400, 1))
    stock.push(new productos('pantalon', 2500, 2,))
    stock.push(new productos('camisa', 1900, 3,))
    stock.push(new productos('short', 2000, 4,))
    stock.push(new productos('jean', 6000, 5,))
    stock.push(new productos('zapatillas', 10000, 6))
    stock.push(new productos('bermuda', 1500, 7))
    stock.push(new productos('buzo', 2000, 8))
    console.log(stock)


    // crear un div por cada uno-------------------------------------
    for (const producto of stock) {
        let contenedor = document.createElement('main')

        // agregar html por cada uno
        contenedor.innerHTML = `<div class="card">
                            <div class="card-body">
                            <h2> Nombre : ${producto.nombre}</h2>
                            <h3> Precio : $${producto.precio}</h3>
                            <h3> id : ${producto.id}</h3>
                            <button id="${producto.id}" class ="btn btn-primary" > Agregar al carrito </button>
                            </div>
                            </div>`

        // agregar contenedor
        document.body.append(contenedor)
    }



    // array de carrito----------------------------
    const carrito = []
    let botones = document.getElementsByClassName('btn')
    // agregar al carrito
    for (const boton of botones) {
        boton.onclick = () => {
            // let carrodiv = document.getElementById('carritodiv')
            // carrodiv.style.display = 'block'
            let productoSeleccionado = stock.find((el) => el.id === parseInt(boton.id))
            Swal.fire({
                title: `¿Quiere agregar el producto al carrito? `,
                text: ` PRODUCTO : ${productoSeleccionado.nombre} ,   PRECIO : ${productoSeleccionado.precio}`,
                icon: 'success',
                confirmButtonText: 'okey',
                showCancelButton: true,
            }).then((agregar) => {
                if (agregar.isConfirmed) {
                    carrito.push(productoSeleccionado)
                    console.log(carrito)
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    
                    Toastify({
                        text: `se agrego ${productoSeleccionado.nombre}`,
                        duration: 1900,
                        gravity: 'bottom'
                    }).showToast()
                    actualizarContadorCarrito();

                }
                else {
                    Swal.fire('no se agrego el producto',  )
                }
                // implemento librerias al boton------------------------------
            })
        }
    }

    function actualizarContadorCarrito() {
        let contador = document.querySelector('.contador');
        contador.innerHTML = carrito.length.toString();
    }

// funcion carrito mostrar productos----------------------------
function mostrarCarritoCompras() {
    // mostrar carrito
    let MostrarCarrito = document.getElementById('mostrarCarrito')
    MostrarCarrito.onclick = () => {
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))
        console.log(carritoLocalStorage)

        const nombreProductos = carritoLocalStorage.map((e) => e.nombre)
        Swal.fire({
            title: ` Los productos en el carrito son : `,
            text: `Los productos que estan en el carrito son: ${nombreProductos} \n`,
            icon: 'success',
            
        })
        
    }
}
mostrarCarritoCompras()


    // boton finalizar compra-----------------------------------
    let terminarCompra = document.getElementById('finalizarCompra')
    document.body.append(terminarCompra);

    // terminar compra, limpiar local storage y limpiar carrito-----------------------------------
    terminarCompra.onclick = () => {
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));
        console.log(carritoLocalStorage)
        const nombreProductos = carritoLocalStorage.map((e) => e.nombre);
        Swal.fire({
            title: ` ¿desea finalizar la compra con ${nombreProductos.length} productos? `,
            text: `Productos : ${nombreProductos}`,
            icon: 'success',
            confirmButtonText: 'okey',
            showCancelButton: true,
        }).then((aviso) => {
            if (aviso.isConfirmed) {
                localStorage.clear()
                carrito.length = 0
                Toastify({
                    text: `¡se confirmo la compra con exito! `,
                    duration: 2000,
                    gravity: 'bottom'
                }).showToast()
            }
            else{
                Swal.fire('no se finalizo la compra',  )
            }
        })
    }
}



// ingreso a la pagina y ser mayor de edad para comprar-------------------------------------------
function solicitarEdad() {
    Swal.fire({
        title: 'Ingrese su edad para ingresar a la pagina',
        input: 'number',
        inputLabel: 'Edad:',
        showCancelButton: true,
        confirmButtonText: 'Verificar',
    }).then((result) => {
                let spinner = document.getElementById('spinner')
                let cargando = document.getElementById('cargando')
            if (result.isConfirmed) {
                const edadIngresada = parseInt(result.value);
                if (edadIngresada >= 18) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Bienvenido',
                            text: 'Eres mayor de edad. ¡Acceso permitido!',
                        });
                        setTimeout(() => {
                            spinner.style.display='none'
                            cargando.style.display='none'
                            losProductos()
                        }, 2000);
                        spinner.style.display='block'
                        cargando.style.display='block'
                        
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso denegado',
                        text: 'Lo siento, debes ser mayor de edad para acceder.',
                    });
                    ;
                }
            }
        
    });
}
solicitarEdad();



