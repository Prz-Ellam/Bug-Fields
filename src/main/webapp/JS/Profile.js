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
    
    function validateInput(state, name) {
        if (state === false) {
            $('#' + name).addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $('#' + name).addClass("is-valid").removeClass("is-invalid");
        }
    }
    
    
   
    $("#first-name").focus(function() {
        $("#first-name").removeClass("is-invalid").removeClass("is-valid");
        $("#firstName-error-label").remove();
    });

    $("#first-name").blur(function() {
        let validator = $("#profile-form").validate();
        validateInput(validator.element("#first-name"), this.name); 
    });

    $('#last-name').focus(function() {
        $("#last-name").removeClass("is-invalid").removeClass("is-valid");
        $("#last-name-error-label").remove();
    });

    $('#last-name').blur(function() {
        let validator = $("#profile-form").validate();
        validateInput(validator.element("#last-name"), this.name); 
    });

    $('#username').focus(function() {
        $("#username").removeClass("is-invalid").removeClass("is-valid");
        $("#username-error-label").remove();
    });

    $('#username').blur(function() {
        let validator = $("#profile-form").validate();
        validateInput(validator.element("#username"), this.name);
    })

    $('#email').focus(function() {
        $("#email").removeClass("is-invalid").removeClass("is-valid");
        $("#email-error-label").remove();
    });

    $('#email').blur(function() {
        let validator = $("#profile-form").validate();
        validateInput(validator.element("#email"), this.name); 
    });

    $('#date-of-birth').focus(function() {
        $("#date-of-birth").removeClass("is-invalid").removeClass("is-valid");
        $("#date-of-birth-error-label").remove();
    });

    $('#date-of-birth').blur(function() {
        let validator = $("#profile-form").validate();
        validateInput(validator.element("#date-of-birth"), this.name); 
    });
    
    $('#date-of-birth').on('input', function() { 
        
        let diff = Date.now() - Date.parse($(this).val());
    let age = new Date(diff);

    let outputAge = age.getUTCFullYear() - 1970;

    if(outputAge < 0)
        outputAge = 0;

    $("#age").val(outputAge);
        
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
    
    $.validator.addMethod('passwordX', function(value, element, parameter) {
        return this.optional(element) || $('#new-password').val() == value;
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
    
    $('#profile-form').validate({
        rules: {
            "first-name":{
                required: true,
                whitespaces: true,
                alphas: true
            },
            "last-name": {
                required: true,
                whitespaces: true,
                alphas: true
            },
            username: {
                required: true,
                whitespaces: true,
                username: true,
                duplicateUsername: true
            },
            email: {
                required: true,
                whitespaces: true,
                emailForm: true
            },
            "date-of-birth": {
                required: true,
                whitespaces: true,
                date: true,
                daterange: ['1900-01-01', dateFormat]
            }
        },
        messages: {
            "first-name":{
                required: 'El nombre no puede estar vacío.',
                whitespaces: 'El nombre no puede estar vacío.',
                alphas: 'El nombre no es válido.'
            },
            "last-name": {
                required: 'El apellido no puede estar vacío.',
                whitespaces: 'El apellido no puede estar vacío.',
                alphas: 'El apellido no es válido.'
            },
            username: {
                required: 'El nombre de usuario no puede estar vacío.',
                whitespaces: 'El nombre de usuario no puede estar vacío.',
                username: 'El nombre de usuario no es válido',
                duplicateUsername: 'El nombre de usuario ya esta siendo usado.'
            },
            email: {
                required: 'El correo electrónico no puede estar vacío.',
                whitespaces: 'El correo electrónico no puede estar vacío.',
                emailForm: 'El correo electrónico no es válido.'
            },
            "date-of-birth": {
                required: 'La fecha de nacimiento no puede estar vacía.',
                whitespaces: 'La fecha de nacimiento no puede estar vacía.',
                date: 'La fecha de nacimiento no es válida',
                daterange: 'La fecha de nacimiento no es válida'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });

    $("#profile-form").submit(function(e) {
        
        e.preventDefault();

        if($('#profile-form').valid() === false) {
            let validator = $("#profile-form").validate();
            validateInput(validator.element("#first-name"), 'firstName');
            validateInput(validator.element("#last-name"), 'lastName');
            validateInput(validator.element("#date-of-birth"), 'dateOfBirth');
            validateInput(validator.element("#email"), 'email');
            validateInput(validator.element("#username"), 'username');
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
    
    
    
    $('#old-password').focus(function() {
        $("#old-password").removeClass("is-invalid").removeClass("is-valid");
        $("#old-password-error-label").remove();
    });

    $('#old-password').blur(function() {
        let validator = $("#profile-password-form").validate();
        validateInput(validator.element("#old-password"), this.name); 
    });

    $('#new-password').focus(function() {
        $("#new-password").removeClass("is-invalid").removeClass("is-valid");
        $("#new-password-error-label").remove();
    });

    $('#new-password').blur(function() {
        let validator = $("#profile-password-form").validate();
        validateInput(validator.element("#new-password"), this.name); 
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


    $('#confirm-new-password').focus(function() {
        $("#confirm-new-password").removeClass("is-invalid").removeClass("is-valid");
        $("#confirm-new-password-error-label").remove();
    });

    $('#confirm-new-password').blur(function() {
        let validator = $("#profile-password-form").validate();
        validateInput(validator.element("#confirm-new-password"), this.name); 
    });


$('#profile-password-form').validate({
        rules: {
            "old-password": {
                required: true,
                whitespaces: true
            },
            "new-password": {
                required: true,
                whitespaces: true,
                passwordRequirements: true
            },
            "confirm-new-password": {
                required: true,
                whitespaces: true,
                passwordX: true
            }
        },
        messages: {
            "old-password": {
                required: 'La contraseña no puede estar vacía.',
                whitespaces: 'La contraseña no puede estar vacía.'
            },
            "new-password": {
                required: 'La nueva contraseña no puede estar vacía.',
                whitespaces: 'La nueva contraseña no puede estar vacía.',
                passwordRequirements: 'La nueva contraseña no es válida.'
            },
            "confirm-new-password": {
                required: 'Confirmar nueva contraseña no puede estar vacío.',
                whitespaces: 'Confirmar nueva contraseña no puede estar vacío.',
                passwordX: 'Confirmar nueva contraseña no coincide con contraseña.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
        }
    });


$("#profile-password-form").submit(function(e){

    e.preventDefault();
    if($('#profile-password-form').valid() === false) {
        let validator = $("#profile-password-form").validate();
        validateInput(validator.element("#password"), 'password');
        validateInput(validator.element("#newPassword"), 'newPassword');
        validatePasswordRequirements();
        validateInput(validator.element("#confirmNewPassword"), 'confirmNewPassword');
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

$(document).on('click', '#close-session', function(e) {
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
            alert('No se pudo cerrar la sesión');
        }
    }).fail(function(jqXHR, state) {
        console.log("Ups...algo salio mal: " + state);
    });
});