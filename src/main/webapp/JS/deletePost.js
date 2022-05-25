import closeSession from "./Utils/CloseSession.js";

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
                <a href="MyPosts.html" class="dropdown-item">Mis publicaciones</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="close-session">Salir</a>
            </div>
        </li>`;


    $(".navbar-nav").append(html);

}).fail(function(jqXHR, state) {

    console.log("Ups...algo salio mal: " + state);

});

$.ajax({
    data: { "id" : new URLSearchParams(window.location.search).get("id") },
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetPostById"
}).done(function(data) {

    if (data.status) {
        $("#title").val(data.post.title);
        $("#description").val(data.post.description);

        $.each(data.categories, function(i, e) {
            $("#post-categories").append(`<option>${e.name}</option>`);
        });
    }
    else {
        window.location.href = "index.html";
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});


$(document).ready(function(){

    $("#delete-post").submit(function(e) {

        e.preventDefault();

        $.ajax({
            data: "post-id=" + new URLSearchParams(window.location.search).get("id"),
            type: "POST",
            dataType: "json",
            url: "DeletePostController"
        }).done(function(data) {
            if (data.status) {

                Swal.fire({
                    icon: "success",
                    title: "Se ha eliminado tú publicación",
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
        closeSession();
    });

});