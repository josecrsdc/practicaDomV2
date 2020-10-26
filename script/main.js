
// let cajaCarrito, carrito;
document.addEventListener("DOMContentLoaded", function(event) {
    let catalogo = [{'modelo': 'Model S',
                    'foto': 'model_S',
                    'precio': "79990",
                    'cantidad': 0,
                    'enCarrito': false
                    },
                    {'modelo': 'Model 3',
                    'foto': 'model_3',
                    'precio': "49000",
                    'cantidad': 0,
                    'enCarrito': false 
                    },
                    {'modelo': 'Model X',
                    'foto': 'model_X',
                    'precio': "88990",
                    'cantidad': 0,
                    'enCarrito': false 
                    },
                    {'modelo': 'Model Y',
                    'foto': 'model_Y',
                    'precio': "64000",
                    'cantidad': 0,
                    'enCarrito': false 
                    }];
                    
    // Elementos DOM
    let cajaCatalogo = document.getElementById("catalogo-contenido");                
    let cajaCarrito = document.getElementById("carrito-contenido");      
    let precioCarrito = document.getElementById("carrito-precioTotal");         
    let vaciarCarrito = document.getElementById("carrito-vaciar"); 
    
                    
    // Declaracion variables necesarias
    let articulo, articuloImg, articuloTitulo, articuloCantidad, articuloPrecio, contenedorBotones, articuloBtnBorrar, articuloBtnBorrarAll, precioTotal = 0, articuloSuma;
    let carrito = [];
    

    //-------------------------------------------------
    //--------------------CATALOGO---------------------
    //-------------------------------------------------
    catalogo.forEach(coche => {
        // Crear articulo
        articulo = document.createElement("article");
        articulo.className = "catalogo-articulo";
        articulo.onclick = function addCarrito() {
            if (existeEnCarrito(coche)) {
                coche.cantidad++;
            } else {
                coche.enCarrito = true;
                coche.cantidad = 1;
            }
            mostrarCarrito();
        }

        // Crear imagen del articulo
        creaImagen(coche);
        
        // Crear titulo y añadir texto
        creaTitulo(coche);
        
        // Crear precio y añadir texto
        creaPrecio(coche);
        
        // Insertar elementos al articulo
        articulo.appendChild(articuloImg);
        articulo.appendChild(articuloTitulo);
        articulo.appendChild(articuloPrecio);

        // Insertar articulo a caja catalogo
        cajaCatalogo.appendChild(articulo);

    });

    

//-------------------------------------------------
//--------------------CARRITO----------------------
//-------------------------------------------------
    function mostrarCarrito() {
            cajaCarrito.innerHTML = "";
            precioTotal = 0;
            carrito = catalogo.filter(coche => coche.enCarrito == true);
            carrito.forEach(coche => {
                //Calcula precio total
                precioTotal += parseInt(coche.precio)*coche.cantidad;

                // Crear articulo
                articulo = document.createElement("article");
                articulo.className = "carrito-articulo";
        
                // Crear imagen del articulo
                creaImagen(coche);
        
                // Crear titulo y añadir texto
                creaTitulo(coche);
        
                // Crear precio y añadir texto
                creaPrecio(coche);

                // Crear cantidad en el carrito
                creaCantidad(coche);
                
                // Crear suma conjunto por articulo
                creaSumaPorArticulo(coche);

                // Crear contenedor botones
                contenedorBotones = document.createElement("div");
                contenedorBotones.className = "contenedor-botones";

                // Crear boton borrar
                creaBtnBorrar(coche);

                // Crear boton borrar-todos
                creaBtnBorrarAll(coche);

                // Insertar elementos al articulo
                articulo.appendChild(articuloImg);
                articulo.appendChild(articuloTitulo);
                articulo.appendChild(articuloPrecio);
                articulo.appendChild(articuloCantidad);
                articulo.appendChild(articuloSuma);
                articulo.appendChild(contenedorBotones);
                contenedorBotones.appendChild(articuloBtnBorrar);
                contenedorBotones.appendChild(articuloBtnBorrarAll);
        
                // Insertar articulo a caja catalogo
                cajaCarrito.appendChild(articulo);
            });
            let precioFormat = new Intl.NumberFormat("es-ES").format(precioTotal);
            precioCarrito.innerHTML = "Precio Total Carrito: " + precioFormat + " €";
        }

        vaciarCarrito.onclick = function () {
            carrito.forEach(coche => {
                coche.cantidad = 0;
                coche.enCarrito = false;
            });
            mostrarCarrito();
        }


        function existeEnCarrito(coche) {
            return coche.enCarrito;
        }
    
        function creaImagen(coche) {
            articuloImg = document.createElement("img");
            articuloImg.className = "articulo-img";
            articuloImg.src = "./img/" + coche.foto + ".jpg";
        }
    
        function creaTitulo(coche) {
            articuloTitulo = document.createElement("p");
            articuloTitulo.className = "articulo-titulo";
            tituloTexto = document.createTextNode(coche.modelo);
            articuloTitulo.appendChild(tituloTexto);
        }
    
        function creaPrecio(coche) {
            articuloPrecio = document.createElement("p");
            articuloPrecio.className = "articulo-precio";
            let logoPrecio = document.createElement("img");
            logoPrecio.className = "precio-logo";
            logoPrecio.src = "./img/precio-logo.png";
            let precioFormat = new Intl.NumberFormat("es-ES").format(coche.precio);
            precioTexto = document.createTextNode(precioFormat + " €");
            articuloPrecio.appendChild(logoPrecio);
            articuloPrecio.appendChild(precioTexto);
        }
    
        function creaCantidad(coche) {
            articuloCantidad = document.createElement("p");
            articuloCantidad.className = "articulo-cantidad";
            cantidadTexto = document.createTextNode(" x " + coche.cantidad);
            articuloCantidad.appendChild(cantidadTexto);
        }

        function creaSumaPorArticulo(coche) {
            articuloSuma = document.createElement("p");
            articuloSuma.className = "articulo-suma";
            let logoSuma = document.createElement("img");
            let precioFormat = new Intl.NumberFormat("es-ES").format(coche.cantidad * coche.precio);
            sumaTexto = document.createTextNode("Precio Total: " + precioFormat + " €");
            articuloSuma.appendChild(sumaTexto);
        }
    
        function creaBtnBorrar(coche) {
            articuloBtnBorrar = document.createElement("p");
            articuloBtnBorrar.className = "boton-borrar";
            articuloBtnBorrar.onclick = function borrarUnidad() {
                if (coche.cantidad > 1) {
                    coche.cantidad--;
                }else {
                    coche.enCarrito = false;
                }
                mostrarCarrito();
            }
            botonTexto = document.createTextNode("Borrar");
            articuloBtnBorrar.appendChild(botonTexto);
        }

        function creaBtnBorrarAll(coche) {
            articuloBtnBorrarAll = document.createElement("p");
            articuloBtnBorrarAll.className = "boton-borrarAll";
            articuloBtnBorrarAll.onclick = function borrarAll() {
                coche.cantidad = 0;
                coche.enCarrito = false;
                mostrarCarrito();
            }
            botonTexto = document.createTextNode("Borrar Todo");
            articuloBtnBorrarAll.appendChild(botonTexto);
        }
    

});