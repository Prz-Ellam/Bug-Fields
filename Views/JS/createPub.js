// Titulo y descripción
var rgxTitleDesc = /^[\w\-\s]+$/;

// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

// Solo letras del alfabeto y numeros
//var rgxUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;

// Validar formato de email
//let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


//FUNCIONES PARA VALIDAR

function validateTitle(){

    if($(".titulo").val() === ""){

        $(".titulo").addClass("is-invalid").removeClass("is-valid");
        $(".titulo-invalid").text("Título vacío.");
        return 1;
        
    }else if(!$(".titulo").val().match(rgxTitleDesc) || $(".titulo").val().match(rgxWhitespaces)){
        
        $(".titulo").addClass("is-invalid").removeClass("is-valid");
        $(".titulo-invalid").text("Título no válido.");
        return 1;

    }else{
        $(".titulo").addClass("is-valid").removeClass("is-invalid");
    }

    return 0;
}

function validateDescription(){

    if($(".descripcion").val() === ""){

        $(".descripcion").addClass("is-invalid").removeClass("is-valid");
        $(".descripcion-invalid").text("Descripción vacía.");
        return 1;
        
    }else if(!$(".descripcion").val().match(rgxTitleDesc) || $(".descripcion").val().match(rgxWhitespaces)){
        
        $(".descripcion").addClass("is-invalid").removeClass("is-valid");
        $(".description-invalid").text("Descripción no válida.");
        return 1;

    }else{
        $(".descripcion").addClass("is-valid").removeClass("is-invalid");
    }
    
    return 0;
}


//VALIDACIONES

$(".titulo").on('blur', function(){
    validateTitle(this);
});

$(".titulo").on('focus', function(){
    onFocus(this);
});

$(".descripcion").on('blur', function(){
    validateDescription(this);
});

$(".descripcion").on('focus', function(){
    onFocus(this);
});

$("#CreateForm").submit(function(e){

    let title = $(".titulo").val();
    let desc = $(".descripcion").val();

    let result = 0;
    result += validateTitle(title);
    result += validateDescription(desc);

    if(result > 0)
        e.preventDefault();

});


function onFocus(input){
    $(input).removeClass("is-valid").removeClass("is-invalid");
}


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