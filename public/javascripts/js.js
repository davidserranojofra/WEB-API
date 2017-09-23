

const $anuncios = $('#anuncios');
let ruta = '/apiv1/anuncios'
let ventaOBusqueda;

//cargar todo los anuncios al inicio
$(function () {
    cargaFullAnuncios();
});

function cargaFullAnuncios() {
    $.ajax({
        type: 'GET',
        url: '/apiv1/anuncios',
        success: function(traeAnuncios) {
            let anuncio = traeAnuncios.list;
             for (let i = 0; i < anuncio.length; i++) {

                if(anuncio[i].venta == true) {
                    ventaOBusqueda = 'En venta';
                } else {
                    ventaOBusqueda = 'Se busca';
                }
                $anuncios.append(`
                                    <div class="container">
                                        <article class="articulo">
                                            <div class="informacion">
                                                <h2>${ventaOBusqueda}</h2>
                                                <p><b>Nombre:</b> ${anuncio[i].nombre}</p>
                                                <p><b>Precio:</b> ${anuncio[i].precio} € </p>
                                                <p><b>Tags:</b> ${anuncio[i].tags}</p>   
                                            </div>
                                            <div class="imagen">
                                                <img src="${anuncio[i].foto}" alt="${anuncio[i].nombre}">
                                            </div>
                                        </article>
                                    </div>
                                `);
             }
        },
        error: function() {
            alert('Error al cargar anuncios');
        }
    });
}

//filtra anuncios Get
$('#filtra-resultados').on('click', function(event) {

    let primerCampo = true;
    const nombre = document.getElementById("search");
    const tags = document.getElementById("tags");
    const venta = document.getElementsByName("venta");
    let ventaChekeado;
    const precioMin = document.getElementById("minimo");
    const precioMax = document.getElementById("maximo");
    const saltar = document.getElementById("saltar");
    const mostrar = document.getElementById("mostrar");
    const espanyol = document.getElementById("es");

    //Error de comparacion si minimo es mas grande que maximo
    if(precioMax.value !== "") {
        if(precioMax.value < precioMin.value) {
            alert('Error, lo siento inserta la cantidad mas baja en el minimo');
            return;
        }
    }

    //creo la ruta de busqueda
    if(nombre.value !== "") {
            ruta += '?nombre=' + nombre.value;
            primerCampo = false;
    } 

    if (tags.value !== "") {
        if(primerCampo === true) {
            ruta += '?tags=' + tags.value;
            primerCampo = false;
        } else {
            ruta += '&tags=' + tags.value;
        }
    }

    for(let i = 0; i < venta.length; i++) {
        if(venta[i].checked) {
            ventaChekeado = venta[i].value;
        }     
    }

    if (ventaChekeado !== "") {
        if(primerCampo === true) {
            ruta += '?venta=' + ventaChekeado;
            primerCampo = false;
        } else {
            ruta += '&venta=' + ventaChekeado;
        }
    }

    if (precioMin.value !== "") {
        if( precioMax.value === "") {
            if(primerCampo === true) {
                ruta += '?precio=' + precioMin.value + '-999999999';
                primerCampo = false;
            } else {
                ruta += '&precio=' + precioMin.value + '-999999999';
            }
        } else {
            if(primerCampo === true) {
                ruta += '?precio=' + precioMin.value;
                primerCampo = false;
            } else {
                ruta += '&precio=' + precioMin.value;
            }
        }
    }

    if (precioMax.value !== "") {
        if(primerCampo === true) {
            ruta += '?precio=0-' + precioMax.value;
            primerCampo = false;
        } else {
            if(precioMin.value !== "") {
                ruta += '-' + precioMax.value;
            } else {
                ruta += '&precio=0-' + precioMax.value;
            }
        }
    }

    if (saltar.value !== "") {
        if(primerCampo === true) {
            ruta += '?skip=' + saltar.value;
            primerCampo = false;
        } else {
            ruta += '&skip=' + saltar.value;
        }
    }

    if (mostrar.value !== "") {
        if(primerCampo === true) {
            ruta += '?limit=' + mostrar.value;
            primerCampo = false;
        } else {
            ruta += '&limit=' + mostrar.value;
        }
    }

    if (espanyol.checked) {
        if(primerCampo === true) {
            ruta += '?lang=true';
            primerCampo = false;
        } else {
            ruta += '&lang=true';
        }
    } else {
        if(primerCampo === true) {
            ruta += '?lang=false';
            primerCampo = false;
        } else {
            ruta += '&lang=false';
        }
    }

    console.log(ruta);

    pedirAjax(ruta);

    event.preventDefault();
});

function pedirAjax(url) {
    $anuncios.empty();
    $.ajax({
        type: 'GET',
        url: url,
        success: function(traeAnuncios) {
            let anuncio = traeAnuncios.list;
             for (let i = 0; i < anuncio.length; i++) {

                if(anuncio[i].venta == true) {
                    ventaOBusqueda = 'En venta';
                } else {
                    ventaOBusqueda = 'Se busca';
                }
                
                $anuncios.append(`
                                    <div class="container">
                                        <article class="articulo">
                                            <div class="informacion">
                                                <h2>${ventaOBusqueda}</h2>
                                                <p><b>Nombre:</b> ${anuncio[i].nombre}</p>
                                                <p><b>Precio:</b> ${anuncio[i].precio} € </p>
                                                <p><b>Tags:</b> ${anuncio[i].tags}</p>   
                                            </div>
                                            <div class="imagen">
                                                <img src="${anuncio[i].foto}" alt="${anuncio[i].nombre}">
                                            </div>
                                        </article>
                                    </div>
                                `);
             }
        }
    });
    ruta = '/apiv1/anuncios';
}

$('#insertar').on('click', function(event) {
    
    let mostrarTags = "";
    let tagsChekeados = [];
    $('input:checkbox[name=insert-tags]:checked').each(function(i){
        tagsChekeados[i] = $(this).val();
        mostrarTags += tagsChekeados[i] + ' ';
    });

    console.log(tagsChekeados);
    let nuevoAnuncio = {
        nombre: $('#nombre').val(),
        foto: $('#foto').val(),
        tags: tagsChekeados,
        venta: $('input:radio[name=insert-venta]:checked').val(),
        precio: $('#insert-precio').val()
    };
    console.log(nuevoAnuncio);

    if(nuevoAnuncio.venta === true) {
        ventaOBusqueda = 'En venta';
    } else {
        ventaOBusqueda = 'Se busca';
    }
    
    $.ajax({
        type: 'POST',
        url: '/apiv1/anuncios',
        data: nuevoAnuncio,
        success: function(nuevoAnuncio) {
            console.log(nuevoAnuncio.anuncio);
            let anuncioPost = nuevoAnuncio.anuncio;
            $anuncios.append(`
                <div class="container">
                    <article class="articulo">
                        <div class="informacion">
                            <h2>${ventaOBusqueda}</h2>
                            <p><b>Nombre:</b> ${anuncioPost.nombre}</p>
                            <p><b>Precio:</b> ${anuncioPost.precio} € </p>
                            <p><b>Tags:</b> ${mostrarTags}</p>   
                        </div>
                        <div class="imagen">
                            <img src="${anuncioPost.foto}" alt="${anuncioPost.nombre}">
                        </div>
                    </article>
                </div>
            `)
        },
        error: function(err) {
            //const errorNombre = err.responseJSON.error.errors.nombre.msg;
            console.log(err);
        }                    
    });
    
    event.preventDefault();
});