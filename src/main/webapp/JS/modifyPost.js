$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {

    if (!data.status) {
        window.location.href = "index.html";
    }

    const html = `
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle">
                <span class="text-white mr-2">${data.user.username}</span>
                <img src=${data.user.photo} alt="logo" class="login-logo img-fluid rounded-circle">
            </a>
            <div class="dropdown-menu">
                <a href="Profile.html" class="dropdown-item">Perfil</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="close-session">Salir</a>
            </div>
        </li>`;

    $(".navbar-nav").append(html);

}).fail(function(jqXHR, state) {

    console.log("Ups...algo salio mal: " + state);

});

$.ajax({
    data: { "id" : new URLSearchParams(window.location.search).get("id"), },
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetPostData"
}).done(function(data) {

    if (data.status) {

        $("#title").val(data.post.title);
        $("#description").val(data.post.description);

    }
    else {

        window.location.href = "index.html";
        
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    // Titulo y descripción
    var rgxTitleDesc = /^[\w\-\s]+$/;

    // Solo letras del alfabeto
    var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

    // Solo hay espacios en blanco
    var rgxWhitespaces = /^\s*$/;


    //FUNCIONES PARA VALIDAR

    $('#title').blur(function() {
        let validator = $("#modify-form").validate();
        if (validator.element("#title") === false) {
            $("#title").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#title").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#title').focus(function() {
        $("#title").removeClass("is-invalid").removeClass("is-valid");
        $("#title-error-label").remove();
    });

    $('#description').blur(function() {
        let validator = $("#modify-form").validate();
        if (validator.element("#description") === false) {
            $("#description").addClass("is-invalid").removeClass("is-valid");
        }
        else {
            $("#description").addClass("is-valid").removeClass("is-invalid");
        }
    });

    $('#description').focus(function() {
        $("#description").removeClass("is-invalid").removeClass("is-valid");
        $("#description-error-label").remove();
    });

    $("#modify-form").submit(function(e){

        e.preventDefault();

        if($('#modify-form').valid() === false) {
            $("#title").addClass("is-invalid").removeClass("is-valid");
            $("#description").addClass("is-invalid").removeClass("is-valid");
            return;
        }

        $.ajax({
            data: "post-id=" + new URLSearchParams(window.location.search).get("id") + "&" + $(this).serialize(),
            method: "POST",
            dataType: "json",
            url: "UpdatePostController"
        }).done(function(data) {
            if (data.status){
                console.log("Good");
            }
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });

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

    $.validator.addMethod('whitespaces', function(value, element, parameter) {
        return this.optional(element) || !/^\s*$/.test(value);
    }, 'El correo electrónico no puede estar vacío');

    $.validator.addMethod('alphas', function(value, element, parameter) {
        return this.optional(element) || /^[a-zA-Z \u00C0-\u00FF]+$/.test(value);
    }, 'invalido');

    $('#modify-form').validate({
        rules: {
            title: {
                required: true,
                whitespaces: true,
                alphas: true
            },
            description: {
                required: true,
                whitespaces: true
            }
        },
        messages: {
            title: {
                required: 'El título no puede estar vacío.',
                whitespaces: 'El título no puede estar vacío',
                alphas: 'El título no es válido.'
            },
            description: {
                required: 'La descripción no puede estar vacía.',
                whitespaces: 'La descripción no puede estar vacía.'
            }
        },
        errorElement: 'small',
        errorPlacement: function(error, element) {
            error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
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

});