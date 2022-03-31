var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
$('#dateOfBirth').val(dateFormat);

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
    


    $('#firstName').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#firstName"), this.name);
    });

    $('#firstName').focus(function() {
        $("#firstName").removeClass("is-invalid").removeClass("is-valid");
        $("#firstName-error-label").remove();
    });

    $('#lastName').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#lastName"), this.name);
    });

    $('#lastName').focus(function() {
        $("#lastName").removeClass("is-invalid").removeClass("is-valid");
        $("#lastName-error-label").remove();
    });

    $('#dateOfBirth').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#dateOfBirth"), this.name); 
    });

    $('#dateOfBirth').focus(function() {
        $("#dateOfBirth").removeClass("is-invalid").removeClass("is-valid");
        $("#dateOfBirth-error-label").remove();
    });

    $('#email').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#email"), this.name);
    });

    $('#email').focus(function() {
        $("#email").removeClass("is-invalid").removeClass("is-valid");
        $("#email-error-label").remove();
    });

    $('#username').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#username"), this.name);
    });

    $('#username').focus(function() {
        $("#username").removeClass("is-invalid").removeClass("is-valid");
        $("#username-error-label").remove();
    });

    $('#password').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#password"), this.name);
    });

    $('#password').focus(function() {
        $("#password").removeClass("is-invalid").removeClass("is-valid");
        $("#password-error-label").remove();
    });

    $('#password').on('input', function() {

        let password = $(this).val();

        if (/([A-Z])/.test(password)) {
            $('#field-password-upper').addClass('text-success').removeClass('text-danger');
        }
        else {
            $('#field-password-upper').removeClass('text-success').addClass('text-danger');
        }

        if (/([a-z])/.test(password)) {
            $('#field-password-lower').addClass('text-success').removeClass('text-danger');
        }
        else {
            $('#field-password-lower').removeClass('text-success').addClass('text-danger');
        }

        if (/([0-9])/.test(password)) {
            $('#field-password-number').addClass('text-success').removeClass('text-danger');
        }
        else {
            $('#field-password-number').removeClass('text-success').addClass('text-danger');
        }

        if (/[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/.test(password)) {
            $('#field-password-symbol').addClass('text-success').removeClass('text-danger');
        }
        else {
            $('#field-password-symbol').removeClass('text-success').addClass('text-danger');
        }

        if (password.length > 7) {
            $('#field-password-length').addClass('text-success').removeClass('text-danger');
        }
        else {
            $('#field-password-length').removeClass('text-success').addClass('text-danger');
        }

    });

    $('#confirmPassword').blur(function() {
        let validator = $("#register-form").validate();
        validateInput(validator.element("#confirmPassword"), this.name);
    });

    $('#confirmPassword').focus(function() {
        $("#confirmPassword").removeClass("is-invalid").removeClass("is-valid");
        $("#confirmPassword-error-label").remove();
    });

    $('#register-form').submit(function(e) {
        
        e.preventDefault();

        if($('#register-form').valid() === false) {
            let validator = $("#register-form").validate();
            validateInput(validator.element("#firstName"), 'firstName');
            validateInput(validator.element("#lastName"), 'lastName');
            validateInput(validator.element("#dateOfBirth"), 'dateOfBirth');
            validateInput(validator.element("#email"), 'email');
            validateInput(validator.element("#username"), 'username');
            validateInput(validator.element("#password"), 'password');
            $('.field-password-requirements').addClass('text-danger').removeClass('text-success');
            validateInput(validator.element("#confirmPassword"), 'confirmPassword');
            return;
        }
        
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            dataType: "json",
            url: "RegistrationController"
        }).done(function(data) {
            if (data.signin) {
                window.location.href = "index.html";
            }
            else {
                alert('No se pudo registrar');
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
        
    });
    
    

    $.validator.addMethod('whitespaces', function(value, element, parameter) {
        return this.optional(element) || !/^\s*$/.test(value);
    }, 'El correo electrónico no puede estar vacío');

    $.validator.addMethod('alphas', function(value, element, parameter) {
        return this.optional(element) || /^[a-zA-Z \u00C0-\u00FF]+$/.test(value);
    }, 'invalido');

    $.validator.addMethod('username', function(value, element, parameter) {
        return this.optional(element) || /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/.test(value);
    }, 'invalido');
    
    $.validator.addMethod('emailForm', function(value, element, parameter) {
        return this.optional(element) || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }, 'invalido');

    $.validator.addMethod('daterange', function(value, element, parameter) {
        return this.optional(element) ||
        !(Date.parse(value) > Date.parse(parameter[1]) || Date.parse(value) < Date.parse(parameter[0]));
    }, 'fecha invalida');
    
    $.validator.addMethod('password', function(value, element, parameter) {
        return this.optional(element) || $('#password').val() == value;
    }, 'invalido');
    
    $.validator.addMethod('duplicateUsername', function(value, element, parameter) {
        
        let result;
        $.ajax({
            async: false,
            data: {"username":value},
            type: "POST",
            dataType: "json",
            url: "VerifyUsernameExists"
        }).done(function(data) {
            result = !data.exists;
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
        
        return this.optional(element) || result;
    }, 'invalido');
    
    $.validator.addMethod('passwordRequirements', function(value, element, parameter) {
        let upper = this.optional(element) || /([A-Z])/.test(value);
        let lower = this.optional(element) || /([a-z])/.test(value);
        let number = this.optional(element) || /([0-9])/.test(value);
        let symbol = this.optional(element) || /[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/.test(value);
        let length = this.optional(element) || value.length > 7;
       
        return upper && lower && number && symbol && length;
    }, 'invalido');
    
    $('#register-form').validate({
        rules: {
            photo: {
                required: true
            },
            firstName:{
                required: true,
                whitespaces: true,
                alphas: true
            },
            lastName: {
                required: true,
                whitespaces: true,
                alphas: true
            },
            dateOfBirth: {
                required: true,
                whitespaces: true,
                date: true,
                daterange: ['1900-01-01', dateFormat]
            },
            email: {
                required: true,
                whitespaces: true,
                emailForm: true
            },
            username: {
                required: true,
                whitespaces: true,
                username: true,
                duplicateUsername: true
            },
            password: {
                required: true,
                whitespaces: true,
                passwordRequirements: true
            },
            confirmPassword: {
                required: true,
                whitespaces: true,
                password: true
            }
        },
        messages: {
            photo: {
                required: 'La foto de perfil no puede estar vacía.'
            },
            firstName:{
                required: 'El nombre no puede estar vacío.',
                whitespaces: 'El nombre no puede estar vacío.',
                alphas: 'El nombre no es válido.'
            },
            lastName: {
                required: 'El apellido no puede estar vacío.',
                whitespaces: 'El apellido no puede estar vacío.',
                alphas: 'El apellido no es válido.'
            },
            dateOfBirth: {
                required: 'La fecha de nacimiento no puede estar vacía.',
                whitespaces: 'La fecha de nacimiento no puede estar vacía.',
                date: 'La fecha de nacimiento no es válida',
                daterange: 'La fecha de nacimiento no es válida'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío.',
                whitespaces: 'El correo electrónico no puede estar vacío.',
                emailForm: 'El correo electrónico no es válido.'
            },
            username: {
                required: 'El nombre de usuario no puede estar vacío.',
                whitespaces: 'El nombre de usuario no puede estar vacío.',
                username: 'El nombre de usuario no es válido',
                duplicateUsername: 'El nombre de usuario ya esta siendo usado.'
            },
            password: {
                required: 'La contraseña no puede estar vacía.',
                whitespaces: 'La contraseña no puede estar vacía.',
                passwordRequirements: 'La contraseña no es válida.'
            },
            confirmPassword: {
                required: 'Confirmar contraseña no puede estar vacío.',
                whitespaces: 'Confirmar contraseña no puede estar vacío.',
                password: 'Confirmar contraseña no coincide con contraseña.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });



});


photo.onchange = function(e) {

    let fReader = new FileReader();
    fReader.readAsDataURL(photo.files[0]);
    fReader.onloadend = function(e) {
        let img = document.getElementById('picture-box');
        img.setAttribute('src', e.target.result);
        img.style.opacity = '1';
        photo.style.opacity = '0';
    }

}

// FORM BUSQUEDA NAVBAR

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