$(document).ready(function() {

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

    $('#register-form').validate({
        rules: {
            firstName:{
                required: true
            },
            lastName: {
                required: true
            },
            dateOfBirth: {
                required: true
            },
            email: {
                required: true
            },
            username: {
                required: true,
                //whitespaces: true
            },
            password: {
                required: true,
               // whitespaces: true
            },
            confirmPassword: {
                required: true
            }
        },
        messages: {
            firstName:{
                required: 'El nombre no puede estar vacío.'
            },
            lastName: {
                required: 'El apellido no puede estar vacío.'
            },
            dateOfBirth: {
                required: 'La fecha de nacimiento no puede estar vacía.'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío.'
            },
            username: {
                required: 'El nombre de usuario no puede estar vacío.',
                //whitespaces: true
            },
            password: {
                required: 'La contraseña no puede estar vacía.',
               // whitespaces: true
            },
            confirmPassword: {
                required: 'Confirmar contraseña no puede estar vacío.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });



});



var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
$('#dateOfBirth').val(dateFormat);
//document.getElementById('date-of-birth').setAttribute('max', dateFormat);

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

// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

// Solo letras del alfabeto y numeros
var rgxUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;

// Validar formato de email
let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validateName(input) {

    if (input.value === '') {
        setMessageError(input, 'Nombre(s) no puede estar vacío.');
        return 1;
    }

    if (!input.value.match(rgxAlphas) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Nombre(s) no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateLastName(input) {

    if (input.value === '') {
        setMessageError(input, 'Apellidos no puede estar vacío.');
        return 1;
    }

    if (!input.value.match(rgxAlphas) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Apellidos no válido.');
        return 1;
    }
    
    setMessageSuccess(input);
    return 0;

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

function validateEmail(input) {

    if (input.value === '') {
        setMessageError(input, 'Correo electrónico no puede estar vacío.');
        return 1;
    }

    else if (!input.value.match(rgxEmail) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Correo electrónico no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateUsername(input) {

    if (input.value === '') {
        setMessageError(input, 'Nombre de usuario no puede estar vacío.');
        return 1;
    }
    if (!input.value.match(rgxUsername) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Nombre de usuario no válido.');
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

function validateConfirmPassword(input) {

    if (input.value === '') {
        setMessageError(input, 'Confirmar contraseña no puede estar vacío.');
        return 1;
    }
    if (document.getElementById('password').value != input.value) {
        setMessageError(input, 'Confirmar contraseña no coincide con contraseña.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function onFocus(input) {

    let fieldWrapper = input.parentElement.parentElement;

    let fieldError = fieldWrapper.children[2];
    let inputWarning = fieldWrapper.children[1].children[1];
    let inputSucess = fieldWrapper.children[1].children[2];

    fieldError.style.display = 'none';
    fieldError.innerHTML = '';

    inputWarning.style.visibility = 'hidden';
    inputSucess.style.visibility = 'hidden';

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