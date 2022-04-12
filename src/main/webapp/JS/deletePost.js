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
});