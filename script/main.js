
// let cajaCarrito, carrito;
//document.addEventListener("DOMContentLoaded", function(event) {             
    // Elementos DOM
    // let cajaCatalogo = document.getElementById("catalogo-contenido");                
    let cajaCarrito = document.getElementById("carrito-contenido");      
    // let precioCarrito = document.getElementById("carrito-precioTotal");         
    let vaciarCarrito = document.getElementById("carrito-vaciar").onclick = function () {
        limpiarCarrito();
    }; 


    // Elementos del catalogo
    document.getElementById("articulo1").onclick = function () {
        add(this);
    };
    document.getElementById("articulo2").onclick = function () {
        add(this);
    };
    document.getElementById("articulo3").onclick = function () {
        add(this);
    };
    document.getElementById("articulo4").onclick = function () {
        add(this);
    };


    // Funciones 
    function add(articuloCatalogo) {
        let articulo = creaElemento(articuloCatalogo);
        let imagen = creaImagen(articuloCatalogo);
        let precio = creaPrecio(articuloCatalogo);
        let cantidad = creaCantidad(articuloCatalogo);
        
        let articuloBotones = creaCapaBotones(articuloCatalogo);
        
        
        cajaCarrito.appendChild(articulo);
        articulo.appendChild(imagen);
        articulo.appendChild(precio);
        articulo.appendChild(cantidad);
        let precioTotalArticulo = precioTotal(articuloCatalogo);
        articulo.appendChild(precioTotalArticulo);
        articulo.appendChild(articuloBotones)
        let btnBorrar = creaBtnBorrar(articuloCatalogo);
        let btnBorrarAll = creaBtnBorrarAll(articuloCatalogo);
        articuloBotones.appendChild(btnBorrar);
        articuloBotones.appendChild(btnBorrarAll);

        calculaTotal();
    }


    function calculaTotal() {
        let articulos = cajaCarrito.getElementsByClassName("articulo-suma");
        let precioTotalCarrito = 0;
        Array.from(articulos).forEach(articulo => {
            precioPorarticulo = parseInt(articulo.textContent.split(" ")[2].replace(/\./g, ""));
            precioTotalCarrito += precioPorarticulo;
        })
        let precioFormat = new Intl.NumberFormat("es-ES").format(precioTotalCarrito);
        document.getElementById("carrito-precioTotal").innerText = "Precio Total Carrito: " + precioFormat + " €";

    }

    function creaBtnBorrarAll(articuloCatalogo) {
        articuloBtnBorrarAll = document.createElement("p");
        articuloBtnBorrarAll.className = "boton-borrarAll";
        articuloBtnBorrarAll.onclick = function borrarAll() {
            let idCarrito = "carrito-" + articuloCatalogo.id;
            let articulo = document.getElementById(idCarrito);
            articulo.remove();
            calculaTotal();
        }
        botonTexto = document.createTextNode("Borrar Todo");
        articuloBtnBorrarAll.appendChild(botonTexto);
        
        return articuloBtnBorrarAll;
    }

    function creaBtnBorrar(articuloCatalogo) {
        let articuloBtnBorrar = document.createElement("p");
        articuloBtnBorrar.className = "boton-borrar";
        let idCarrito = "carrito-" + articuloCatalogo.id;
        let unidades = document.getElementById(idCarrito).getElementsByTagName("p")[1].textContent
        articuloBtnBorrar.onclick = function borrarUnidad() {
            if (unidades > 1) {
                unidades--;
                document.getElementById(idCarrito).getElementsByTagName("p")[1].innerText = unidades;
                let precio = articuloCatalogo.getElementsByClassName("articulo-precio");
                // Cambiar por split por si cambia el precio
                precio = precio[0].textContent.substring(7,14).replace(/\./g, "");
                let precioFormat = new Intl.NumberFormat("es-ES").format(precio * unidades);
                document.getElementById(idCarrito).getElementsByTagName("p")[2].innerText = "Precio Total: " + precioFormat + " €";
            }else {
                articuloBtnBorrar.parentNode.parentNode.remove();
            }
            precioTotal(articuloCatalogo);
            calculaTotal();
        }
        botonTexto = document.createTextNode("Borrar");
        articuloBtnBorrar.appendChild(botonTexto);
        
        return articuloBtnBorrar;
    }

    function creaCapaBotones(articuloCatalogo) {
        let capa = document.createElement("div");
        capa.className = "contenedor-botones";
        return capa;
    }
   
    function precioTotal(articuloCatalogo) {
        let articuloSuma = document.createElement("p");
        articuloSuma.className = "articulo-suma";
        let precio = articuloCatalogo.getElementsByClassName("articulo-precio");
        precio = precio[0].textContent.substring(7,14).replace(/\./g, "");
        let idCarrito = "carrito-" + articuloCatalogo.id;
        let parrafos = document.getElementById(idCarrito);
        if (parrafos != null) {
            let unidades = document.getElementById(idCarrito).getElementsByTagName("p")[1].textContent 
            let precioFormat = new Intl.NumberFormat("es-ES").format(precio * unidades);
            sumaTexto = document.createTextNode("Precio Total: " + precioFormat + " €");
            articuloSuma.appendChild(sumaTexto);
        }  
            return articuloSuma;
    }

    function creaCantidad(articuloCatalogo) {
        let unidades = 1;
        let articulos = cajaCarrito.getElementsByTagName("article");
        let idArticulos = "carrito-" + articuloCatalogo.id;
        articulos = Array.from(articulos);
        articulos.forEach(articulo => {
            if (articulo.id == idArticulos ) {
                unidades = articulo.getElementsByTagName("p")[1].textContent;
                unidades++;
                articulo.remove();
            }
        });
        let articuloCantidad = document.createElement("p");
        articuloCantidad.className = "articulo-cantidad";
        cantidadTexto = document.createTextNode(unidades);
        articuloCantidad.appendChild(cantidadTexto);
        return articuloCantidad;
    }

    function creaPrecio(articuloCatalogo) {
        let articuloPrecio = document.createElement("p");
        let precio = articuloCatalogo.getElementsByClassName("articulo-precio");
        articuloPrecio.className = "articulo-precio";
        precioTexto = document.createTextNode(precio[0].textContent);
        articuloPrecio.appendChild(precioTexto);
        return articuloPrecio;
    }

    function creaElemento(articuloCatalogo) {
        let articulo = document.createElement("article");
        articulo.className = "carrito-articulo";
        articulo.id = "carrito-" + articuloCatalogo.id;
        return articulo;
    }

    function creaImagen(articuloCatalogo) {
        let img = articuloCatalogo.getElementsByTagName("img")[0].src
        articuloImg = document.createElement("img");
        articuloImg.className = "articulo-img";
        articuloImg.src = img;
        return articuloImg;
    }


    // Borra html de carrito --------------------FALTA CALCULO
    function limpiarCarrito() {
        let articulos = cajaCarrito.getElementsByClassName("carrito-articulo");
        Array.from(articulos).forEach(articulo => {
            articulo.remove();
        });
        calculaTotal();
    }



//-------------------------------------------------
//--------------------CARRITO----------------------
//-------------------------------------------------

    
    // function mostrarCarrito() {
    //         cajaCarrito.innerHTML = "";
    //         precioTotal = 0;
    //         carrito = catalogo.filter(coche => coche.enCarrito == true);
    //         carrito.forEach(coche => {
    //             //Calcula precio total
    //             precioTotal += parseInt(coche.precio)*coche.cantidad;

    //             // Crear articulo
                //  articulo = document.createElement("article");
                //  articulo.className = "carrito-articulo";
                //  articulo.id = "carrito" + articulo.id;
        
    //             // Crear imagen del articulo
    //             creaImagen(coche);
        
    //             // Crear titulo y añadir texto
    //             creaTitulo(coche);
        
    //             // Crear precio y añadir texto
    //             creaPrecio(coche);

    //             // Crear cantidad en el carrito
    //             creaCantidad(coche);
                
    //             // Crear suma conjunto por articulo
    //             creaSumaPorArticulo(coche);

    //             // Crear contenedor botones
    //             contenedorBotones = document.createElement("div");
    //             contenedorBotones.className = "contenedor-botones";

    //             // Crear boton borrar
    //             creaBtnBorrar(coche);

    //             // Crear boton borrar-todos
    //             creaBtnBorrarAll(coche);

    //             // Insertar elementos al articulo
    //             articulo.appendChild(articuloImg);
    //             articulo.appendChild(articuloTitulo);
    //             articulo.appendChild(articuloPrecio);
    //             articulo.appendChild(articuloCantidad);
    //             articulo.appendChild(articuloSuma);
    //             articulo.appendChild(contenedorBotones);
    //             contenedorBotones.appendChild(articuloBtnBorrar);
    //             contenedorBotones.appendChild(articuloBtnBorrarAll);
        
    //             // Insertar articulo a caja catalogo
    //             cajaCarrito.appendChild(articulo);
    //         });
    //         let precioFormat = new Intl.NumberFormat("es-ES").format(precioTotal);
    //         precioCarrito.innerHTML = "Precio Total Carrito: " + precioFormat + " €";
    //     }

    //     vaciarCarrito.onclick = function () {
    //         carrito.forEach(coche => {
    //             coche.cantidad = 0;
    //             coche.enCarrito = false;
    //         });
    //         mostrarCarrito();
    //     }


    //     function existeEnCarrito(coche) {
    //         return coche.enCarrito;
    //     }
    
    //     function creaImagen(coche) {
    //         articuloImg = document.createElement("img");
    //         articuloImg.className = "articulo-img";
    //         articuloImg.src = "./img/" + coche.foto + ".jpg";
    //     }
    
    //     function creaTitulo(coche) {
    //         articuloTitulo = document.createElement("p");
    //         articuloTitulo.className = "articulo-titulo";
    //         tituloTexto = document.createTextNode(coche.modelo);
    //         articuloTitulo.appendChild(tituloTexto);
    //     }
    
    //     function creaPrecio(coche) {
    //         articuloPrecio = document.createElement("p");
    //         articuloPrecio.className = "articulo-precio";
    //         let logoPrecio = document.createElement("img");
    //         logoPrecio.className = "precio-logo";
    //         logoPrecio.src = "./img/precio-logo.png";
    //         let precioFormat = new Intl.NumberFormat("es-ES").format(coche.precio);
    //         precioTexto = document.createTextNode(precioFormat + " €");
    //         articuloPrecio.appendChild(logoPrecio);
    //         articuloPrecio.appendChild(precioTexto);
    //     }
    
    //     function creaCantidad(coche) {
    //         articuloCantidad = document.createElement("p");
    //         articuloCantidad.className = "articulo-cantidad";
    //         cantidadTexto = document.createTextNode(" x " + coche.cantidad);
    //         articuloCantidad.appendChild(cantidadTexto);
    //     }

    //     function creaSumaPorArticulo(coche) {
    //         articuloSuma = document.createElement("p");
    //         articuloSuma.className = "articulo-suma";
    //         let logoSuma = document.createElement("img");
    //         let precioFormat = new Intl.NumberFormat("es-ES").format(coche.cantidad * coche.precio);
    //         sumaTexto = document.createTextNode("Precio Total: " + precioFormat + " €");
    //         articuloSuma.appendChild(sumaTexto);
    //     }
    
    //     function creaBtnBorrar(coche) {
    //         articuloBtnBorrar = document.createElement("p");
    //         articuloBtnBorrar.className = "boton-borrar";
    //         articuloBtnBorrar.onclick = function borrarUnidad() {
    //             if (coche.cantidad > 1) {
    //                 coche.cantidad--;
    //             }else {
    //                 coche.enCarrito = false;
    //             }
    //             mostrarCarrito();
    //         }
    //         botonTexto = document.createTextNode("Borrar");
    //         articuloBtnBorrar.appendChild(botonTexto);
    //     }

    //     function creaBtnBorrarAll(coche) {
    //         articuloBtnBorrarAll = document.createElement("p");
    //         articuloBtnBorrarAll.className = "boton-borrarAll";
    //         articuloBtnBorrarAll.onclick = function borrarAll() {
    //             coche.cantidad = 0;
    //             coche.enCarrito = false;
    //             mostrarCarrito();
    //         }
    //         botonTexto = document.createTextNode("Borrar Todo");
    //         articuloBtnBorrarAll.appendChild(botonTexto);
    //     }
    