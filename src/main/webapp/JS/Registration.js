import SignupValidator from './Validators/SignUpValidator.js'

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

    if (data.result) {
        window.location.href = "index.html";
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    let formID = "#signup-form";
    var validator = new SignupValidator(formID, dateFormat);

    $(".signup-input").blur(function() {

        validator.validateInput(this, validator.getInputStatus(this));
        
    });

    $(".signup-input").focus(function() {

        validator.focusInput(this);

    });

    $(formID).submit(function(e) {
        
        e.preventDefault();

        if($('#register-form').valid() === false) {
            let validator = $(formID).validate();
            validateInput(validator.element("#firstName"), 'firstName');
            validateInput(validator.element("#lastName"), 'lastName');
            validateInput(validator.element("#dateOfBirth"), 'dateOfBirth');
            validateInput(validator.element("#email"), 'email');
            validateInput(validator.element("#username"), 'username');
            validateInput(validator.element("#password"), 'password');
            validatePasswordRequirements();
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

                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                  );



                //window.location.href = "index.html";
            }
            else {
                alert('No se pudo registrar');
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