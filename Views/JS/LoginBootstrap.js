// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;

// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;


//FUNCIONES PARA VALIDAR

function validateUsername(){

    if($(".username").val() === ""){

        $(".username").addClass("is-invalid").removeClass("is-valid");
        $(".username-invalid").text("Username vacío.");
        return 1;
        
    }else if($(".username").val().match(rgxWhitespaces)){
        
        $(".username").addClass("is-invalid").removeClass("is-valid");
        $(".username-invalid").text("Ingrese un nombre de usuario.");
        return 1;

    }else{
        $(".username").addClass("is-valid").removeClass("is-invalid");
    }

    return 0;
}

function validatePassword(){

    if($(".password").val() === ""){

        $(".password").addClass("is-invalid").removeClass("is-valid");
        $(".password-invalid").text("Password vacía.");
        return 1;

    }else if($(".password").val().match(rgxWhitespaces)){
        
        $(".password").addClass("is-invalid").removeClass("is-valid");
        $(".password-invalid").text("Ingrese una contraseña.");
        return 1;

    }else{
        $(".password").addClass("is-valid").removeClass("is-invalid");
    }

    return 0;
}

function validateSearching(){

    if($(".search-input").val() === ""){
        return 1;      
    }else if(!$(".search-input").val().match(rgxAlphas) || $(".search-input").val().match(rgxWhitespaces)){
        return 1;
    }else
        return 0;

}


//VALIDACIONES

$(".username").on('blur', function(){
    validateUsername(this);
});

$(".username").on('focus', function(){
    onFocus(this);
});

$(".password").on('blur', function(){
    validatePassword(this);
});

$(".password").on('focus', function(){
    onFocus(this);
});

$("#LoginForm").submit(function(e){

    let username = $(".username").val();
    let password = $(".password").val();

    let result = 0;
    result += validateUsername(username);
    result += validatePassword(password);

    if(result > 0)
        e.preventDefault();

});

$("#SearchForm").submit(function(e){

    let search = $(".search-input").val();

    let result = 0;
    result += validateSearching(search);

    if(result > 0){
        e.preventDefault();
        alert("Búsqueda no válida.");
    }

});


function onFocus(input){
    $(input).removeClass("is-valid").removeClass("is-invalid");
}