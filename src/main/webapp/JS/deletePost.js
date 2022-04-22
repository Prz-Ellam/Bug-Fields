$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {

    if (!data.status) {
        window.location.href = "index.html";
    }

    const html = `
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle">
                <span class="text-white mr-2">${data.user.username}</span>
                <img src=${data.user.photo} alt="logo" class="login-logo img-fluid rounded-circle">
            </a>
            <div class="dropdown-menu">
                <a href="Profile.html" class="dropdown-item">Perfil</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="close-session">Salir</a>
            </div>
        </li>`;

    $(".navbar-nav").append(html);

}).fail(function(jqXHR, state) {

    console.log("Ups...algo salio mal: " + state);

});

$.ajax({
    data: { "id" : new URLSearchParams(window.location.search).get("id") },
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetPostData"
}).done(function(data) {

    if (data.status) {
        $("#title").val(data.post.title);
        $("#description").val(data.post.description);
    }
    else {
        window.location.href = "index.html";
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

// Titulo y descripción
var rgxTitleDesc = /^[\w\-\s]+$/;

// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;


// FORM BUSQUEDA

function validateSearching(){

    if($("#search-input").val() === ""){
        return 1;      
    }else if(!$("#search-input").val().match(rgxAlphas) || $("#search-input").val().match(rgxWhitespaces)){
        return 1;
    }else
        return 0;

}

$("#SearchForm").submit(function(e){

    let search = $("#search-input").val();

    let result = 0;
    result += validateSearching(search);

    if(result > 0){
        e.preventDefault();
        alert("Búsqueda no válida.");
    }

});


// Tags
$(document).ready(function(){
    $(".tags").val('jQuery,C++,HTML');


    $(".btn-delete-pub").on('click', function() {
        
        $.ajax({
            data: "post-id=" + new URLSearchParams(window.location.search).get("id"),
            method: "POST",
            dataType: "json",
            url: "DeletePostController"
        }).done(function(data) {
            if (data.status){
                console.log("Good");
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });

    })

    $(document).on('click', '#close-session', function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "CloseSession"
        }).done(function(data) {
            if (data.result) {
                window.location.href = "index.html";
            }
            else {
                alert('No se pudo cerrar la sesión');
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
    });

    $("#delete-post").submit(function(e) {

        e.preventDefault();

        $.ajax({
            data: "post-id=" + new URLSearchParams(window.location.search).get("id"),
            type: "POST",
            dataType: "json",
            url: "DeletePostController"
        }).done(function(data) {
            if (data.status) {

                Swal.fire({
                    icon: "success",
                    title: "Se ha eliminado tú publicación",
                    confirmButtonColor: "#449342",
                    background: "#EFEFEF"
                }).then(function () {
                    window.location.href = "index.html";
                });
                
            }
            else {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que algo salió mal',
                    confirmButtonColor: "#de4f54",
                    background: "#EFEFEF"
                });

            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });

    });

});