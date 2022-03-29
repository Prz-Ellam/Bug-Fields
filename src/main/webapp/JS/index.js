$.ajax({
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {
    if (data.session) {
        $('.session').append('<a href="Profile.html" class="dropdown-toggle" id="dropdownMenuLink"> <img src="Assets/blank-profile-picture.svg" alt="logo" class="login-logo rounded-circle"></a>');
    }
    else {
        alert('No hay sesion');
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
        location.href = "createPub.html";
    });

    $("#btn-advSearch").click(function(){
        location.href = "AdvancedSearch.html";
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

});