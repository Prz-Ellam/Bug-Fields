$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "VerifySession",
    cache: false
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
      
}).fail(function(jqXHR, state, error) {
    console.log("Ups...algo salio mal: " + state);
});

$.ajax({
    data: { "page" : new URLSearchParams(window.location.search).get("page") },
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetPosts",
    cache: false
}).done(function(data) {

    for (let i = 0; i < data.posts.length; i++) {

        let post = data.posts[i];

        let html = `
        <section>
            <div class="container mt-5">
                <article class="card bg-light m-4 p-4 rounded-3">
                ${post.userOwn ? `<a href="modifyPost.html?id=${post.postId}"` : `<a href="ViewPost.html?id=${post.postId}"`} class="card-title" id="${post.postId}">${post.title}</a>
                    <h6 class="card-subtitle text-muted">${post.username}</h5>
                    <p class="card-body description">${post.description}</p>

                    <div class="btn-group card-link">`;

                    for (let j = 0; j < post.categories.length; j++) {

                        html +=  `
                        <a href="AdvancedSearch.html?category=${post.categories[j].categoryId}&start=&end=&search=" class="btn btn-outline-primary p-0">${post.categories[j].name}</a>
                        `;

                    }

                    html += `</div>

                    <div class="card-text text-right">
                        <p><small class="text-muted">Creada: ${post.creationDate}</small></p>
                    </div>

                ${post.userOwn ?

                    `<div class="card-footer m-0 p-2 text-right">
                        <a class="delete btn btn-danger" href="deletePost.html?id=${post.postId}">Eliminar</a>
                    </div>` : ``
                }
                </article>
            </div>
        </section>
        `;

        $("main").append(html);

    }

    if (data.page > 1) {
        
        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="?page=${data.page-1}">Anterior</a>
        </li>
        `);

    }
    else {

        $("ul.pagination").append(`
        <li class="page-item disabled">
            <a class="page-link">Anterior</a>
        </li>
        `);

    }
    
    let numberOfButtons = (data.numberOfPages > 5) ? 5 : data.numberOfPages;

    for (let i = 0; i < numberOfButtons; i++) {

        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="?page=${i + 1}">${i + 1}</a>
        </li>
        `);

    }

    if (data.numberOfPages > numberOfButtons) {

        $("ul.pagination").append(`
        <li class="page-item disabled">
            <span class="page-link">...</span>
        </li>
        `);

        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="?page=${data.numberOfPages}">${data.numberOfPages}</a>
        </li>
        `);

    }


    if (data.page + 1 > data.numberOfPages) {

        $("ul.pagination").append(`
        <li class="page-item disabled">
            <a class="page-link">Siguiente</a>
        </li>
        `);

    }
    else {

        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="?page=${parseInt(data.page) + 1}">Siguiente</a>
        </li>
        `);

    }

}).fail(function(jqXHR, state, error) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    // Botones para redirigir
    $("#btn-createPub").click(function(){
        location.href = "createPost.html";
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
            url: "CloseSession",
            cache: false
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