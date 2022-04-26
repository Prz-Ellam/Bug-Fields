import SignupValidator from './Validators/SignUpValidator.js'

var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + 
String(date.getDate()).padStart(2, '0');

$('#date-of-birth').val(dateFormat);

$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {

    if (data.status) {
        window.location.href = "index.html";
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    let formID = "#signup-form";
    let inputClass = ".signup-input";
    var validator = new SignupValidator(formID, dateFormat);

    $(inputClass).blur(function() {

        validator.validateInput(this);
        
    });

    $(inputClass).focus(function() {

        validator.focusInput(this);

    });

    function validatePasswordRequirements() {
        let password = $("#password").val();

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
    }

    $('#password').on('input', function() {

        validatePasswordRequirements();

    });

    $(formID).submit(function(e) {
        
        e.preventDefault();

        if($(formID).valid() === false) {
            validator.validateInput($("#first-name"));
            validator.validateInput($("#last-name"));
            validator.validateInput($("#date-of-birth"));
            validator.validateInput($("#email"));
            validator.validateInput($("#username"));
            validator.validateInput($("#password"));
            validatePasswordRequirements();
            validator.validateInput($("#confirm-password"));
            return;
        }
        
        $.ajax({
            data: new FormData(this),
            type: "POST",
            dataType: "json",
            url: "RegistrationController",
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data) {
            if (data.status) {

                Swal.fire({
                    icon: "success",
                    title: "¡Bienvenido a Bug Fields!",
                    confirmButtonText: "Comencemos",
                    confirmButtonColor: "#449342",
                    background: "#EFEFEF"
                }).then(function () {
                    window.location.href = "index.html";
                });

            }
            else {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que algo salió mal',
                    confirmButtonColor: "#de4f54",
                    background: "#EFEFEF"
                });
                
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
        
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