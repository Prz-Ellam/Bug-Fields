$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {
    if (!data.session) {
        $('.session').append('<label class="text-white pr-2">Iniciar sesión</label>' +
                '<a href="Login.html">' +
                '<img src="Assets/blank-profile-picture.svg" alt="logo" class="login-logo rounded-circle">' +
                '</a>');
    }
    else {
        $('.session').append('<div class="dropdown show d-inline col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-right">' +
                '<a class="btn btn-secondary shadow-none dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<img src="Assets/blank-profile-picture.svg" alt="logo" class="login-logo rounded-circle">' +
                '</a>' +
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
                '<button class="dropdown-item" id="profile">Perfil</button>' +
               '<button class="dropdown-item" id="closeSession">Cerrar Sesión</button>' +
                '</div>' +
            '</div>');
       
    }
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    // Solo letras del alfabeto
    var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

    // Solo hay espacios en blanco
    var rgxWhitespaces = /^\s*$/;


    // Botones para redirigir

    $("#btn-createPub").click(function(){
        location.href = "createPost.html";
    });

    $("#btn-advSearch").click(function(){
        location.href = "AdvancedSearch.html";
    });
    
    $(".update").click(function(){
        location.href = "modifyPost.html";
    });
    
    $(".delete").click(function(){
        location.href = "deletePost.html";
    });


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
    
    $(document).on('click', '#closeSession', function(e) {
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
    
    $(document).on('click', '#profile', function(e) {
        e.preventDefault();
        window.location.href = "Profile.html";
    });


});