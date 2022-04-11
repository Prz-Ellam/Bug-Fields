import CreatePostValidator from "./Validators/CreatePostValidator.js";

$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {

    if (!data.status) {
        window.location.href = "index.html";
    }

}).fail(function(jqXHR, state) {

    console.log("Ups...algo salio mal: " + state);

});


$(document).ready(function() {

    var formID = "#signup-form";
    var validator = new CreatePostValidator(formID);

    //FUNCIONES PARA VALIDAR
    $(".post-input").blur(function() {

        validator.validateInput(this, validator.getInputStatus(this));
        
    });

    $(".post-input").focus(function() {

        validator.focusInput(this);

    });

    $(formID).submit(function(e){

        e.preventDefault();

        if($(this).valid() === false) {
            $("#title").addClass("is-invalid").removeClass("is-valid");
            $("#description").addClass("is-invalid").removeClass("is-valid");
            return;
        }

        $.ajax({
            data: $(this).serialize(),
            method: "POST",
            dataType: "json",
            url: "CreatePostController"
        }).done(function(data) {
            if (data.status){
                console.log("Good");
            }
        }).fail(function() {

        })

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