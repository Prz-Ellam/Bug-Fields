import ModifyPostValidator from "./Validators/ModifyPostValidator.js";

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

        for (let i = 0; i < data.categories.length; i++) {
            $("#categories").append(`
            <option value="${data.categories[i].categoryId}"> ${data.categories[i].name}</option>
            `);
        }

    }

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

        $.each(data.categories, function(i, e) {
            $(`option[value="${e.categoryId}"]`).attr("selected", "selected");
        });

    }
    else {

        window.location.href = "index.html";
        
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

    var formID = "#modify-form";
    var validator = new ModifyPostValidator(formID);

    //FUNCIONES PARA VALIDAR
    $(".form-input").blur(function() {

        validator.validateInput(this);
        
    });

    $(".form-input").focus(function() {

        validator.focusInput(this);

    });
    
    $(formID).submit(function(e){

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

            if (data.status) {

                Swal.fire({
                    icon: "success",
                    title: "Se ha editado con éxito tú publicación",
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