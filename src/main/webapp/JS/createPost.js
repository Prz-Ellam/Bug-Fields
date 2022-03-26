$(document).ready(function() {

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

    $('#title').blur(function() {
        let validator = $("#create-form").validate();
        if (validator.element("#title") === false) {
            $("#title").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#title").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#title').focus(function() {
        $("#title").removeClass("is-invalid").removeClass("is-valid");
        $("#title-error-label").remove();
    });

    $('#description').blur(function() {
        let validator = $("#create-form").validate();
        if (validator.element("#description") === false) {
            $("#description").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#description").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#description').focus(function() {
        $("#description").removeClass("is-invalid").removeClass("is-valid");
        $("#description-error-label").remove();
    });

    $("#create-form").submit(function(e){

        if($('#create-form').valid() === false) {
            $("#title").addClass("is-invalid").removeClass("is-valid");
            $("#description").addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
            return;
        }

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

    $.validator.addMethod('whitespaces', function(value, element, parameter) {
        return this.optional(element) || !/^\s*$/.test(value);
    }, 'El correo electrónico no puede estar vacío');

    $.validator.addMethod('alphas', function(value, element, parameter) {
        return this.optional(element) || /^[a-zA-Z \u00C0-\u00FF]+$/.test(value);
    }, 'invalido');

    $('#create-form').validate({
        rules: {
            title: {
                required: true,
                whitespaces: true,
                alphas: true
            },
            description: {
                required: true,
                whitespaces: true
            }
        },
        messages: {
            title: {
                required: 'El título no puede estar vacío.',
                whitespaces: 'El título no puede estar vacío',
                alphas: 'El título no es válido.'
            },
            description: {
                required: 'La descripción no puede estar vacía.',
                whitespaces: 'La descripción no puede estar vacía.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });

});