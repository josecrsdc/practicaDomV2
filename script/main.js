         
                  
    let cajaCarrito = document.getElementById("carrito-contenido");             
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
                precio = parseInt(precio[0].textContent.split(" ")[1].replace(/\./g, ""));
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


    function limpiarCarrito() {
        let articulos = cajaCarrito.getElementsByClassName("carrito-articulo");
        Array.from(articulos).forEach(articulo => {
            articulo.remove();
        });
        calculaTotal();
    }
