$(document).ready(function() {

    var date = new Date();
    var dateFormat = date.getFullYear() + '-' + 
    String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    $('#dateOfBirth').val(dateFormat);

    //$('#dateOfBirth').attr('min', '1900-01-01').attr('max', dateFormat);

    $('#firstName').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#firstName") === false) {
            $("#firstName").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#firstName").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#firstName').focus(function() {
        $("#firstName").removeClass("is-invalid").removeClass("is-valid");
        $("#firstName-error-label").remove();
    });

    $('#lastName').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#lastName") === false) {
            $("#lastName").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#lastName").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#lastName').focus(function() {
        $("#lastName").removeClass("is-invalid").removeClass("is-valid");
        $("#lastName-error-label").remove();
    });

    $('#dateOfBirth').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#dateOfBirth") === false) {
            $("#dateOfBirth").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#dateOfBirth").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#dateOfBirth').focus(function() {
        $("#dateOfBirth").removeClass("is-invalid").removeClass("is-valid");
        $("#dateOfBirth-error-label").remove();
    });

    $('#email').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#email") === false) {
            $("#email").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#email").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#email').focus(function() {
        $("#email").removeClass("is-invalid").removeClass("is-valid");
        $("#email-error-label").remove();
    });

    $('#username').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#username") === false) {
            $("#username").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#username").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#username').focus(function() {
        $("#username").removeClass("is-invalid").removeClass("is-valid");
        $("#username-error-label").remove();
    });

    $('#password').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#password") === false) {
            $("#password").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#password").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#password').focus(function() {
        $("#password").removeClass("is-invalid").removeClass("is-valid");
        $("#password-error-label").remove();
    });

    $('#confirmPassword').blur(function() {
        let validator = $("#register-form").validate();
        if (validator.element("#confirmPassword") === false) {
            $("#confirmPassword").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#confirmPassword").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#confirmPassword').focus(function() {
        $("#confirmPassword").removeClass("is-invalid").removeClass("is-valid");
        $("#confirmPassword-error-label").remove();
    });

    $('#register-form').submit(function(e) {

        if($('#register-form').valid() === false) {
            $("#firstName").addClass("is-invalid").removeClass("is-valid");
            $("#lastName").addClass("is-invalid").removeClass("is-valid");
            $("#dateOfBirth").addClass("is-invalid").removeClass("is-valid");
            $("#email").addClass("is-invalid").removeClass("is-valid");
            $("#username").addClass("is-invalid").removeClass("is-valid");
            $("#password").addClass("is-invalid").removeClass("is-valid");
            $("#confirmPassword").addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
            return;
        }

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

    $.validator.addMethod('daterange', function(value, element, parameter) {
        return this.optional(element) ||
        !(Date.parse(value) > Date.parse(parameter[1]) || Date.parse(value) < Date.parse(parameter[0]));
    }, 'fecha invalida');

    $.validator.addMethod('confirmPassword', function(value, element, parameter) {
        return this.optional(element) || $('#password').val() == value;
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
                email: true
            },
            username: {
                required: true,
                whitespaces: true,
                username: true
            },
            password: {
                required: true,
                whitespaces: true
            },
            confirmPassword: {
                required: true,
                whitespaces: true,
                confirmPassword: true
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
                daterange: 'La fecha de nacimiento no es válida'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío.',
                whitespaces: 'El correo electrónico no puede estar vacío.',
                email: 'El correo electrónico no es válido.'
            },
            username: {
                required: 'El nombre de usuario no puede estar vacío.',
                whitespaces: 'El nombre de usuario no puede estar vacío.',
                username: 'El nombre de usuario no es válido'
            },
            password: {
                required: 'La contraseña no puede estar vacía.',
                whitespaces: 'La contraseña no puede estar vacía.'
            },
            confirmPassword: {
                required: 'Confirmar contraseña no puede estar vacío.',
                whitespaces: 'Confirmar contraseña no puede estar vacío.',
                confirmPassword: 'Confirmar contraseña no coincide con contraseña.'
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

function validateDateOfBirth(input) {

    if (input.value === '') {
        setMessageError(input, 'Fecha de nacimiento no válida.');
        return 1;
    }

    if (Date.parse(input.value) > Date.parse(dateFormat) || Date.parse(input.value) < Date.parse('1900-01-01')) {
        setMessageError(input, 'Fecha de nacimiento no válida.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validatePassword(input) {

    if (input.value === '') {
        setMessageError(input, 'Contraseña no puede estar vacía.');
        let upper = document.getElementById('field-password-upper');
        let lower = document.getElementById('field-password-lower');
        let number = document.getElementById('field-password-number');
        let symbol = document.getElementById('field-password-symbol');
        let length = document.getElementById('field-password-length');
        upper.style.color = 'rgb(222, 79, 84)';
        lower.style.color = 'rgb(222, 79, 84)';
        number.style.color = 'rgb(222, 79, 84)';
        symbol.style.color = 'rgb(222, 79, 84)';
        length.style.color = 'rgb(222, 79, 84)';
        return 1;
    }

    if (!checkPassword(input.value)) {
        setMessageError(input, 'Contraseña no válida.');
        return 1;
    }
    
    setMessageSuccess(input);
    return 0;

}

function checkPassword(password) {

    let result = true;

    let upper = document.getElementById('field-password-upper');
    let lower = document.getElementById('field-password-lower');
    let number = document.getElementById('field-password-number');
    let symbol = document.getElementById('field-password-symbol');
    let length = document.getElementById('field-password-length');

    if (!password.match(/([A-Z])/)) {
        upper.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        upper.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/([a-z])/)) {
        lower.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        lower.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/([0-9])/)) {
        number.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        number.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/)) {
        symbol.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        symbol.style.color = 'rgb(121, 177, 143)';
    }

    if (password.length < 8) {
        length.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        length.style.color = 'rgb(121, 177, 143)';
    }

    return result;

}

function setMessageErrorOnPhoto(){
    let photoMessage =  document.getElementById('photo-error');
    photoMessage.style.display = 'block';
    photoMessage.style.color = 'rgb(222, 78, 84)';
}

function setMessageSuccessOnPhoto(){
    let photoMessage =  document.getElementById('photo-error');
    photoMessage.style.display = 'none';
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