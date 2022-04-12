$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {
    
    if (data.status) {

        const html = `
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle">
                <span class="text-white mr-2">Perfil</span>
                <img src="Assets/blank-profile-picture.svg" alt="logo" class="login-logo img-fluid rounded-circle">
            </a>
            <div class="dropdown-menu">
                <a href="Profile.html" class="dropdown-item">Perfil</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="close-session">Salir</a>
            </div>
        </li>`;

        $(".navbar-nav").append(html);

    }
    else {

        const html = `
        <li class="nav-item">
            <a href="Login.html" class="nav-link">
                <span class="text-white mr-2">Iniciar sesión</span>
                <img src="Assets/blank-profile-picture.svg" alt="logo" class="login-logo img-fluid rounded-circle">
            </a>
        </li>`;

        $(".navbar-nav").append(html);
     
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

});