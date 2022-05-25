import LoginValidator from './Validators/LoginValidator.js'

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

    let formID = "#login-form";
    let inputClass = ".login-input";
    var validator = new LoginValidator(formID);

    $(inputClass).blur(function() {
        validator.validateInput(this);
    });

    $(inputClass).focus(function() {
        validator.focusInput(this);
    });

    $(formID).submit(function(e) {
        
        $('.login-fail').addClass('d-none');
        e.preventDefault();

        if($(formID).valid() === false) {
            validator.validateInput($("#username"));
            validator.validateInput($("#password"));
            return;
        }
        
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            dataType: "json",
            url: "LoginController"
        }).done(function(data) {
            if (data.status) {
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

});