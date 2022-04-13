$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession"
}).done(function(data) {
    
    if (data.status) {

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

    }
    else {

        const html = `
        <li class="nav-item">
            <a href="Login.html" class="nav-link text-white">Iniciar sesión</a>
        </li>`;

        $(".navbar-nav").append(html);
     
    }
      
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$.ajax({
    data: { "page" : new URLSearchParams(window.location.search).get("page") },
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetPosts"
}).done(function(data) {

    for (let i = 0; i < data.posts.length; i++) {

        let post = data.posts[i];

        const html = `
        <section>
            <div class="container mt-5">
                <article class="card bg-light m-4 p-4 rounded-3">
                    
                    <a href="modifyPost.html?id=${post.postId}" class="card-title" id="${post.postId}">${post.title}</a>
                    <h6 class="card-subtitle text-muted">${post.username}</h5>
                    <p class="card-body">Descripción Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis reprehenderit hic commodi eius! Porro tenetur optio, ex nobis quod excepturi debitis dignissimos deleniti quidem? Sit dolor velit quas id perferendis?</p>

                    <div class="btn-group card-link">
                        <button type="button" class="btn btn-outline-primary p-0">Categoría 1</button>
                        <button type="button" class="btn btn-outline-primary p-0">Categoría 2</button>
                        <button type="button" class="btn btn-outline-primary p-0">Categoría 3</button>
                    </div>

                    <div class="card-text text-right">
                        <p><small class="text-muted">${post.creationDate}</small></p>
                    </div>

                    <div class="card-footer m-0 p-2 text-right">
                        <button class="update btn btn-secondary">Modificar</button>
                        <button class="delete btn btn-danger">Eliminar</button>
                    </div>

                </article>
            </div>
        </section>
        `

        $("main").append(html);

    }


    let page = new URLSearchParams(window.location.search).get("page");
    if (page === null) {
        page = 0;
    }

    previousPage = page - 1;
    nextPage = parseInt(page) + 1;

    if (previousPage > 0) {
    
    $("ul.pagination").append(`<li class="page-item">
    <a class="page-link" href="?page=${page-1}" tabindex="-1">Anterior</a>
    </li>`);

    }
    else {
        $("ul.pagination").append(`<li class="page-item disabled">
        <a class="page-link" tabindex="-1">Anterior</a>
        </li>`);
    }

    if (nextPage > data.pagesCount) {

        $("ul.pagination").append(`<li class="page-item disabled">
        <a class="page-link">Siguiente</a>
      </li>`);

    }
    else {

        $("ul.pagination").append(`<li class="page-item">
        <a class="page-link" href="?page=${parseInt(page)+1}">Siguiente</a>
      </li>`);

    }


    
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {




















    

    // Solo letras del alfabeto
    var rgxAlphas = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

    // Solo hay espacios en blanco
    var rgxWhitespaces = /^\s*$/;


    // Botones para redirigir

    $("#btn-createPub").click(function(){
        location.href = "createPost.html";
    });

    $("#btn-advSearch").click(function(){
        location.href = "AdvancedSearch.html";
    });
    
    $(".update").click(function(){
        location.href = "modifyPost.html";
    });
    
    $(".delete").click(function(){
        location.href = "deletePost.html";
    });


    // FORM BUSQUEDA
    $("#search-box").submit(function(e) {

        if ($("#searching").val() === "") {
             e.preventDefault();
            return;
        }
/*
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            dataType: "json",
            url: "SearchBoxController"
        }).done(function(data) {
            alert(data.posts);
        }).fail(function(jqXHR, state) {
            console.log("Ups...algo salio mal: " + state);
        });
*/
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