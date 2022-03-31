$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {
    if (data.session) {
        window.location.href = "index.html";
    }
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    function validateInput(state, name) {
        if (state === false) {
            $('#' + name).addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $('#' + name).addClass("is-valid").removeClass("is-invalid");
        }
    }

    //VALIDACIONES
    $('#username').blur(function() {
        let validator = $("#login-form").validate();
        validateInput(validator.element("#username"), this.name);
    });

    $('#username').focus(function() {
        $("#username").removeClass("is-invalid").removeClass("is-valid");
        $("#username-error-label").remove();
    });

    $('#password').blur(function() {
        let validator = $("#login-form").validate();
        validateInput(validator.element("#password"), this.name);
    });

    $('#password').focus(function() {
        $("#password").removeClass("is-invalid").removeClass("is-valid");
        $("#password-error-label").remove();
    });

    $("#login-form").submit(function(e) {
        
        $('.login-fail').addClass('d-none');
        e.preventDefault();

        if($('#login-form').valid() === false) {
            let validator = $("#login-form").validate();
            validateInput(validator.element("#username"), 'username');
            validateInput(validator.element("#password"), 'password');
            return;
        }
        
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            dataType: "json",
            url: "LoginController"
        }).done(function(data) {
            if (data.result) {
                window.location.href = "index.html";
            }
            else {
                $("#username").addClass("is-invalid").removeClass("is-valid");
                $("#password").addClass("is-invalid").removeClass("is-valid");
                $('.login-fail').removeClass('d-none');
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });

    });



    $.validator.addMethod('whitespaces', function(value, element, parameter) {
        return this.optional(element) || !/^\s*$/.test(value);
    }, 'No puede estar vacío');

    $('#login-form').validate({
        rules: {
            username: {
                required: true,
                whitespaces: true
            },
            password: {
                required: true,
                whitespaces: true
            }
        },
        messages: {
            username: {
                required: 'El correo electrónico no puede estar vacío.',
                whitespaces: 'El correo electrónico no puede estar vacío'
            },
            password: {
                required: 'La contraseña no puede estar vacía.',
                whitespaces: 'La contraseña no puede estar vacía.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
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

});