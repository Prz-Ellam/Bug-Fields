import CreatePostValidator from "./Validators/CreatePostValidator.js";

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
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetCategories"
}).done(function(data) {

    if (data.status) {

        console.log(data.categories);

        //let categoriesName = [];
        for (let i = 0; i < data.categories.length; i++) {
            $("#categories").append(`
            <option value="${data.categories[i].categoryId}"> ${data.categories[i].name}</option>
            `);
            //categoriesName.push(data.categories[i].name);
        }

    }

}).fail(function(jqXHR, state) {

    console.log("Ups...algo salio mal: " + state);

});


$(document).ready(function() {

    $("#categories").multipleSelect({
        selectAll: false,
        width: '100%',
        filter: true
    });

    var formID = "#create-post-form";
    var validator = new CreatePostValidator(formID);

    //FUNCIONES PARA VALIDAR
    $(".post-input").blur(function() {

        validator.validateInput(this);
        
    });

    $(".post-input").focus(function() {

        validator.focusInput(this);

    });

    $(formID).submit(function(e){

        e.preventDefault();

        if($(this).valid() === false) {
            $("#title").addClass("is-invalid").removeClass("is-valid");
            $("#description").addClass("is-invalid").removeClass("is-valid");
            return;
        }

        $.ajax({
            data: $(this).serialize(),
            method: "POST",
            dataType: "json",
            url: "CreatePostController"
        }).done(function(data) {
            if (data.status){

                Swal.fire({
                    icon: "success",
                    title: "Se ha guardado con éxito tú publicación",
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
        }).fail(function() {

        })

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