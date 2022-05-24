import ProfileValidator from "./Validators/ProfileValidator.js";
import PasswordValidator from "./Validators/PasswordValidator.js";

var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + 
String(date.getDate()).padStart(2, '0');
$('#dateOfBirth').val(dateFormat);

$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "InitProfileController"
}).done(function(data) {
    if (!data.session) {
        window.location.href = "index.html";
    }
    else {
        const html = `
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle">
                <span class="text-white mr-2">${data.profile.username}</span>
                <img src=${data.profile.photo} alt="logo" class="login-logo img-fluid rounded-circle">
            </a>
            <div class="dropdown-menu">
            <a href="Profile.html" class="dropdown-item">Perfil</a>
            <div class="dropdown-divider"></div>
            <a href="MyPosts.html" class="dropdown-item">Mis publicaciones</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item" id="close-session">Salir</a>
        </div>
        </li>`;

        $(".navbar-nav").append(html);
    
        $("#first-name").val(data.profile.name);
        $("#last-name").val(data.profile.lastName);
        $("#date-of-birth").val(data.profile.dateOfBirth);
        $("#email").val(data.profile.email);
        $("#username").val(data.profile.username);
        $("#age").val(data.profile.age);
        $("#picture-box").attr("src", data.profile.photo);
    }
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    $("#photo-file").change(showPreviewImage_click);

    let formID = "#profile-form";
    let validator = new ProfileValidator(formID, dateFormat);

    let passwordFormId = "#profile-password-form";
    let passwordValidator = new PasswordValidator(passwordFormId);

    //FUNCIONES PARA VALIDAR
    $(".form-input").blur(function() {

        validator.validateInput(this);
        
    });

    $(".form-input").focus(function() {

        validator.focusInput(this);

    });

    $(".password-input").blur(function() {

        passwordValidator.validateInput(this);
        
    });

    $(".password-input").focus(function() {

        passwordValidator.focusInput(this);

    });


    $('#date-of-birth').on('input', function() { 
        
        let diff = Date.now() - Date.parse($(this).val());
        let age = new Date(diff);
        let outputAge = age.getUTCFullYear() - 1970;
        
        if(outputAge < 0) {
            outputAge = 0;
        }
        
        $("#age").val(outputAge);
        
    });


    $(formID).submit(function(e) {
        
        e.preventDefault();

        if($(formID).valid() === false) {
            validator.validateInput($("#first-name"));
            validator.validateInput($("#last-name"));
            validator.validateInput($("#date-of-birth"));
            validator.validateInput($("#email"));
            validator.validateInput($("#username"));
            return;
        }

        $.ajax({
            data: new FormData(this),
            type: "POST",
            dataType: "json",
            url: "ProfileController",
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data) {

            if (data.status) {
                Swal.fire({
                    icon: "success",
                    title: "Se ha editado con éxito tú perfil",
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
    
    
    function validatePasswordRequirements() {
        let password = $("#new-password").val();

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
    
    $('#new-password').on('input', function() {

        validatePasswordRequirements();

    });
    
    $(passwordFormId).submit(function(e){
        
        e.preventDefault();
        if($(passwordFormId).valid() === false) {
            passwordValidator.validateInput($("#old-password"));
            passwordValidator.validateInput($("#new-password"));
            validatePasswordRequirements();
            passwordValidator.validateInput($("#confirm-new-password"));
            return;
        }

    $.ajax({
        data: $(this).serialize(),
        type: "POST",
        dataType: "json",
        url: "UpdatePasswordController",
    }).done(function(data) {

        if (data.status) {
            Swal.fire({
                icon: "success",
                title: "Se ha editado con éxito tú perfil",
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
                text: 'Parece que algo salió mal, revise que su contraseña este correcta',
                confirmButtonColor: "#de4f54",
                background: "#EFEFEF"
            });
        }

    }).fail(function(jqXHR, state) {
        console.log("Ups...algo salio mal: " + state);
    });
        
});



   $(document).on('click', '#closeSession', function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "CloseSession"
        }).done(function(data) {
            if (data.result) {
                window.location.href = "index.html";
            }
            else {
                console.log('No se pudo cerrar la sesión');
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
    });
    
    $(document).on('click', '#profile', function(e) {
        e.preventDefault();
        window.location.href = "Profile.html";
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
