// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

// Solo letras del alfabeto y numeros
var rgxUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;

// Validar formato de email
let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
//document.getElementById('date-of-birth').value = dateFormat;
$("#date-of-birth").val(dateFormat);
//document.getElementById('date-of-birth').setAttribute('max', dateFormat);


$(document).ready(function() {

    $("#photo-file").change(showPreviewImage_click);

    $("#name").focus(function() {
        $("#name").removeClass("is-invalid").removeClass("is-valid");
        $("#name-error-label").remove();
    });

    $("#name").blur(function() {
        let validator = $("#profile-form").validate();
        if (validator.element("#name") === false) {
            $("#name").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#name").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#lastName').focus(function() {
        $("#lastName").removeClass("is-invalid").removeClass("is-valid");
        $("#lastName-error-label").remove();
    });

    $('#lastName').blur(function() {
        let validator = $("#profile-form").validate();
        if (validator.element("#lastName") === false) {
            $("#lastName").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#lastName").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#username').focus(function() {
        $("#username").removeClass("is-invalid").removeClass("is-valid");
        $("#username-error-label").remove();
    });

    $('#username').blur(function() {
        let validator = $("#profile-form").validate();
        if (validator.element("#username") === false) {
            $("#username").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#username").addClass("is-valid").removeClass("is-invalid");
        }
    })

    $('#email').focus(function() {
        $("#email").removeClass("is-invalid").removeClass("is-valid");
        $("#email-error-label").remove();
    });

    $('#email').blur(function() {
        let validator = $("#profile-form").validate();
        if (validator.element("#email") === false) {
            $("#email").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#email").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#dateOfBirth').focus(function() {
        $("#dateOfBirth").removeClass("is-invalid").removeClass("is-valid");
        $("#dateOfBirth-error-label").remove();
    });

    $('#dateOfBirth').blur(function() {
        let validator = $("#profile-form").validate();
        if (validator.element("#dateOfBirth") === false) {
            $("#dateOfBirth").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#dateOfBirth").addClass("is-valid").removeClass("is-invalid");
        }
        /*
        validateDateOfBirth('#date-of-birth');
        validateAge('#date-of-birth');
        */
    });

    $('#password').focus(function() {
        onFocus('#password');
    });

    $('#password').blur(function() {
        validatePassword('#password');
    });

    $('#confirm-password').focus(function() {
        onFocus('#confirm-password');
    });

    $('#confirm-password').blur(function() {
        checkNewPassword($('#confirm-password').val());
        validateConfirmPassword('#confirm-new-password');
    });

    $('#confirm-new-password').focus(function() {
        onFocus('#confirm-new-password');
    });

    $('#confirm-new-password').blur(function() {
        validateConfirmPassword('#confirm-new-password');
    });


    $('#profile-form').validate({
        rules: {
            name: {
                required: true
                //whitespaces: true
            },
            lastName: {
                required: true
                //whitespaces: true
            },
            username: {
                required: true
            },
            email: {
                required: true
            },
            dateOfBirth: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'El nombre no puede estar vacío.',
                //whitespaces: 'El título no puede estar vacío'
            },
            lastName: {
                required: 'El apellido no puede estar vacío.',
                //whitespaces: 'La descripción no puede estar vacía.'
            },
            username: {
                required: 'El nombre de usuario no puede estar vacío.'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío.'
            },
            dateOfBirth: {
                required: 'La fecha de nacimiento no puede estar vacía.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });


    
    $("#profile-form").submit(function(e){

        if($('#profile-form').valid() === false) {
            $("#name").addClass("is-invalid").removeClass("is-valid");
            $("#lastName").addClass("is-invalid").removeClass("is-valid");
            $("#username").addClass("is-invalid").removeClass("is-valid");
            $("#email").addClass("is-invalid").removeClass("is-valid");
            $("#dateOfBirth").addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
            return;
        }
        /*
        let result = 0;
        result += validateName("#name");
        result += validateLastName("#last-name");
        result += validateUsername("#username");
        result += validateEmail("#email");
        result += validateDateOfBirth("#date-of-birth");

        if($("#photo-file").val() === ''){
            result += 1;
        }

        if(result > 0)
            e.preventDefault();

            */
    });










});


function showPreviewImage_click(e) {
    var $input = $(this);
    var inputFiles = this.files;
    if(inputFiles == undefined || inputFiles.length == 0) return;
    var inputFile = inputFiles[0];

    var reader = new FileReader();
    reader.onload = function(event) {
        $("#photo").attr("src", event.target.result);
        $("#photo-error").css('visibility', 'hidden');
    };
    reader.onerror = function(event) {
        alert("I AM ERROR: " + event.target.error.code);
    };
    reader.readAsDataURL(inputFile);
}


//VALIDACIONES

function validateName(input){

    if ($(input).val() === '') {
        setMessageError(input, 'Nombre(s) no puede estar vacío.');
        return 1;
    }

    if (!$(input).val().match(rgxAlphas) || $(input).val().match(rgxWhitespaces)) {
        setMessageError(input, 'Nombre(s) no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateLastName(input){

    if ($(input).val() === '') {
        setMessageError(input, 'Apellidos no puede estar vacío.');
        return 1;
    }

    if (!$(input).val().match(rgxAlphas) || $(input).val().match(rgxWhitespaces)) {
        setMessageError(input, 'Apellidos no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateUsername(input) {

    if ($(input).val() === '') {
        setMessageError(input, 'Nombre de usuario no puede estar vacío.');
        return 1;
    }

    if (!$(input).val().match(rgxUsername) || $(input).val().match(rgxWhitespaces)) {
        setMessageError(input, 'Nombre de usuario no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateEmail(input) {

    if ($(input).val() === '') {
        setMessageError(input, 'Correo electrónico no puede estar vacío.');
        return 1;
    }

    if (!$(input).val().match(rgxEmail) || $(input).val().match(rgxWhitespaces)) {
        setMessageError(input, 'Correo electrónico no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateDateOfBirth(input) {

    if ($(input).val() === '') {
        setMessageError(input, 'Fecha de nacimiento no puede estar vacío.');
        return 1;
    }

    if (Date.parse($(input).val()) > Date.parse(dateFormat) || Date.parse($(input).val()) < Date.parse('1900-01-01')) {
        setMessageError(input, 'Fecha de nacimiento no válida.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateAge(input) {

    let diff = Date.now() - Date.parse($(input).val());
    let age = new Date(diff);

    let outputAge = age.getUTCFullYear() - 1970;

    if(outputAge < 0)
        outputAge = 0;

    //let outputAge = Math.abs(age.getUTCFullYear() - 1970);

    $("#age").val(outputAge);
}




function validatePassword(input) {

    if ($(input).val() === '') {
        setMessageError(input, 'Contraseña antigua no puede estar vacío.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function checkNewPassword(password) {

    let result = true;

    if(password === ''){
        $("#confirm-password-error").css('visibility', 'visible');
        $("#confirm-password-error").html('Contraseña nueva no puede estar vacío.');
    }else{
        $("#confirm-password-error").css('visibility', 'hidden');
    }

    if (!password.match(/([A-Z])/)) {
        //upper.style.color = 'rgb(222, 79, 84)';
        $("#field-password-upper").css('color', 'rgb(222, 79, 84)');
        result = false;
    }
    else {
        //upper.style.color = 'rgb(121, 177, 143)';
        $("#field-password-upper").css('color', 'rgb(121, 177, 143)');
    }

    if (!password.match(/([a-z])/)) {
        //lower.style.color = 'rgb(222, 79, 84)';
        $("#field-password-lower").css('color', 'rgb(222, 79, 84)');
        result = false;
    }
    else {
        //lower.style.color = 'rgb(121, 177, 143)';
        $("#field-password-lower").css('color', 'rgb(121, 177, 143)');
    }

    if (!password.match(/([0-9])/)) {
        //number.style.color = 'rgb(222, 79, 84)';
        $("#field-password-number").css('color', 'rgb(222, 79, 84)');
        result = false;
    }
    else {
        //number.style.color = 'rgb(121, 177, 143)';
        $("#field-password-number").css('color', 'rgb(121, 177, 143)');
    }

    if (!password.match(/[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/)) {
        //symbol.style.color = 'rgb(222, 79, 84)';
        $("#field-password-symbol").css('color', 'rgb(222, 79, 84)');
        result = false;
    }
    else {
        //symbol.style.color = 'rgb(121, 177, 143)';
        $("#field-password-symbol").css('color', 'rgb(121, 177, 143)');
    }

    if (password.length < 8) {
        //length.style.color = 'rgb(222, 79, 84)';
        $("#field-password-length").css('color', 'rgb(222, 79, 84)');
        result = false;
    }
    else {
        //length.style.color = 'rgb(121, 177, 143)';
        $("#field-password-length").css('color', 'rgb(121, 177, 143)');
    }

    if(!result){
        $("#confirm-password-warning").css('visibility', 'visible');
        $("#confirm-password-success").css('visibility', 'hidden');
    }else{
        $("#confirm-password-success").css('visibility', 'visible');
        $("#confirm-password-warning").css('visibility', 'hidden');
    }

    return result;

}

function validateConfirmPassword(password){
    
    if ($(password).val() === '') {
        setMessageError(password, 'Confirmar contraseña no puede estar vacío.');
        return 1;
    }
    if ($("#confirm-password").val() != $(password).val()) {
        setMessageError(password, 'Confirmar contraseña no coincide con contraseña.');
        return 1;
    }

    setMessageSuccess(password);
    return 0;

}


$("#profile-password-form").submit(function(e){

    let result = 0;
    result += validatePassword('#password');

    if(!checkNewPassword($('#confirm-password').val()))
        result += 1;

    result += validateConfirmPassword('#confirm-new-password');

    if(result > 0)
        e.preventDefault();
});



function setMessageSuccess(input) {

    let fieldError = $(input + '-error');
    let inputWarning = $(input + '-warning');
    let inputSuccess = $(input + '-success');

    fieldError.css('visibility', 'hidden');
    fieldError.html('');

    inputWarning.css('visibility', 'hidden');
    inputSuccess.css('visibility', 'visible');

    $(input).addClass('input-valid');
    $(input).removeClass('input-invalid');

}

function setMessageError(input, errorMessage) {

    let fieldError = $(input + '-error');
    let inputWarning = $(input + '-warning');
    let inputSuccess = $(input + '-success');

    fieldError.css('visibility', 'visible');
    fieldError.html(errorMessage);

    inputWarning.css('visibility', 'visible');
    inputSuccess.css('visibility', 'hidden');

    $(input).addClass('input-invalid');
    $(input).removeClass('input-valid');

}

function onFocus(input) {

    let fieldError = $(input + '-error');
    let inputWarning = $(input + '-warning');
    let inputSuccess = $(input + '-success');

    fieldError.css('visibility', 'hidden');
    fieldError.html('');

    inputWarning.css('visibility', 'hidden');
    inputSuccess.css('visibility', 'hidden');

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