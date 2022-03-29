// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

// Solo letras del alfabeto y numeros
var rgxUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;

// Validar formato de email
let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

$.ajax({
    type: "GET",
    dataType: "json",
    url: "InitProfileController"
}).done(function(data) {
    if (data.session) {
        $("#firstName").val(data.name);
        $("#lastName").val(data.lastName);
        $("#email").val(data.email);
        $("#username").val(data.username);
        $("#age").val(data.age);
    }
    else {
        window.location.href = 'index.html';
    }
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    $("#photo-file").change(showPreviewImage_click);
    
    var date = new Date();
    var dateFormat = date.getFullYear() + '-' + 
    String(date.getMonth() + 1).padStart(2, '0') + '-' + 
    String(date.getDate()).padStart(2, '0');
    $('#dateOfBirth').val(dateFormat);

    $("#firstName").focus(function() {
        $("#firstName").removeClass("is-invalid").removeClass("is-valid");
        $("#firstName-error-label").remove();
    });

    $("#firstName").blur(function() {
        let validator = $("#profile-form").validate();
        if (validator.element("#firstName") === false) {
            $("#firstName").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#firstName").addClass("is-valid").removeClass("is-invalid");
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

    $('#profile-form').validate({
        rules: {
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
            username: {
                required: true,
                whitespaces: true,
                username: true
            },
            email: {
                required: true,
                whitespaces: true,
                email: true
            },
            dateOfBirth: {
                required: true,
                whitespaces: true,
                date: true,
                daterange: ['1900-01-01', dateFormat]
            }
        },
        messages: {
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
            username: {
                required: 'El nombre de usuario no puede estar vacío.',
                whitespaces: 'El nombre de usuario no puede estar vacío.',
                username: 'El nombre de usuario no es válido'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío.',
                whitespaces: 'El correo electrónico no puede estar vacío.',
                email: 'El correo electrónico no es válido.'
            },
            dateOfBirth: {
                required: 'La fecha de nacimiento no puede estar vacía.',
                whitespaces: 'La fecha de nacimiento no puede estar vacía.',
                daterange: 'La fecha de nacimiento no es válida'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });


    
    $("#profile-form").submit(function(e) {

/*
        if($('#profile-form').valid() === false) {
            $("#name").addClass("is-invalid").removeClass("is-valid");
            $("#lastName").addClass("is-invalid").removeClass("is-valid");
            $("#username").addClass("is-invalid").removeClass("is-valid");
            $("#email").addClass("is-invalid").removeClass("is-valid");
            $("#dateOfBirth").addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
            return;
        }
        */
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