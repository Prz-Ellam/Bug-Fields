// Titulo y descripción
var rgxTitleDesc = /^[\w\-\s]+$/;

// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;



//FUNCIONES PARA VALIDAR

function validateSearching(){

    if($(".search-input").val() === ""){
        return 1;      
    }else if(!$(".search-input").val().match(rgxAlphas) || $(".search-input").val().match(rgxWhitespaces)){
        return 1;
    }else
        return 0;

}


//VALIDACIONES

$("#SearchForm").submit(function(e){

    let search = $(".search-input").val();

    let result = 0;
    result += validateSearching(search);

    if(result > 0){
        e.preventDefault();
        alert("Búsqueda no válida.");
    }

});