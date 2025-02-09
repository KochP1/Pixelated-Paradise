document.addEventListener("DOMContentLoaded", function() {
    const carrito = document.getElementById("carrito"),
          listaJuegos = document.getElementById("lista-juegos"), // Corregido el id
          contenedorCarrito = document.querySelector(".buy-car .listas_de_carrito"),
          vaciarCarritoBtn = document.querySelector("#vaciar_carrito"); // Agrega el '#' para seleccionar por ID

    let articulosCarrito = [];
    registrarEventListeners();

    function registrarEventListeners() {
        listaJuegos.addEventListener("click", agregarJuego);


        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHtml();

        if (carrito) {
            carrito.addEventListener("click", eliminarJuego);
        } else {
            console.log("Elemento 'carrito' no encontrado en la página.");
        }

        if (vaciarCarritoBtn) {
            vaciarCarritoBtn.addEventListener('click', e => {
                articulosCarrito = [];
                limpiarHTML();
            });
        }
    }


    function agregarJuego(e) {
        if (e.target.classList.contains("agregar-carrito")) {
            const juegoSeleccionado = e.target.parentElement.parentElement;
            console.log(juegoSeleccionado);
            leerInfo(juegoSeleccionado);
        }
    }

    function eliminarJuego(e) {
        if (e.target.classList.contains("borrar-juego")) {
            const juegoId = e.target.getAttribute('data-id');
            console.log(juegoId);

            articulosCarrito = articulosCarrito.filter(juego => juego.id !== juegoId)

            carritoHtml()
        }
    }

    function leerInfo(juego) {
        const imagen = juego.querySelector("img").src;
        const nombre = juego.querySelector("h3").textContent;
        
        // Obtener el precio y limpiar caracteres no numéricos
        const precioTexto = juego.querySelector(".precio").textContent;
        const precioLimpio = parseFloat(precioTexto.replace(/[^0-9.-]+/g,""));
        
        const id = juego.querySelector(".agregar-carrito").getAttribute("data-id");
    
        const infoJuego = {
            imagen: imagen,
            Nombre: nombre,
            precio: precioLimpio, // Usar el precio limpio
            id: id,
            cantidad: 1
        };
    
        const existe = articulosCarrito.some(juego => juego.id === infoJuego.id);
    
        if (existe) {
            articulosCarrito = articulosCarrito.map(juego => {
                if (juego.id === infoJuego.id) {
                    juego.cantidad++;
                }
                return juego;
            });
        } else {
            articulosCarrito = [...articulosCarrito, infoJuego];
        }
        carritoHtml();
    }

    function carritoHtml() {
        limpiarHTML();
        let total = 0;
    
        articulosCarrito.forEach(juego => {
            const fila = document.createElement("div");
            fila.innerHTML = `
                <img src="${juego.imagen}"></img>
                <p>${juego.Nombre}</p>
                <p>${juego.precio}</p>
                <p>${juego.cantidad}</p>
                <p><span class="borrar-juego" data-id="${juego.id}">X</span></p>
            `;
            contenedorCarrito.appendChild(fila);
    
            // Convertir el precio a número y verificar si es válido
            const precioNumerico = parseFloat(juego.precio);
            if (!isNaN(precioNumerico)) {
                total += precioNumerico * juego.cantidad;
            } else {
                console.log(`Error: Precio no válido para el juego ${juego.Nombre}`);
            }
        });
    
        // Agregar el total al HTML del carrito
        const totalElement = document.createElement("div");
        totalElement.innerHTML = `<p>Total a pagar: ${total.toFixed(2)}</p>`;
        contenedorCarrito.appendChild(totalElement);
    
        sincronizarStorage();
    }

    function sincronizarStorage() {
        localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
    }

    function limpiarHTML() {
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
        sincronizarStorage();
    }
});