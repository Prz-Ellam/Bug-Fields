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
                <a href="MyPosts.html" class="dropdown-item">Mis publicaciones</a>
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
    url: "UserPostsController",
    cache: false
}).done(function(response) {

    if (response.status) {

        $.each(response.posts, function(i, e) {

            let html = `
            <section>
                <div class="container mt-5">
                    <article class="card bg-light m-4 p-4 rounded-3">
                        <a href="modifyPost.html?id=${e.postId}" class="card-title" id="${e.postId}">${e.title}</a>
                        <h6 class="card-subtitle text-muted">${e.username}</h5>
                        <p class="card-body description">${e.description}</p>

                        <div class="btn-group card-link">`;

                        for (let j = 0; j < e.categories.length; j++) {

                            html +=  `
                                        <a href="AdvancedSearch.html?category=${e.categories[j].categoryId}&start=&end=&search=" class="btn btn-outline-primary p-0">${e.categories[j].name}</a>
                                    `;

                        }

                        html += `</div>

                        <div class="card-text text-right">
                            <p><small class="text-muted">Creada: ${e.creationDate}</small></p>
                        </div>

                        <div class="card-footer m-0 p-2 text-right">
                            <a class="delete btn btn-danger" href="deletePost.html?id=${e.postId}">Eliminar</a>
                        </div>

                    </article>
                </div>
            </section>
        `;

        $("main").append(html);
            
        })

        if (response.page > 1) {
        
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="?page=${response.page-1}">Anterior</a>
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
        
        let numberOfButtons = (response.numberOfPages > 5) ? 5 : response.numberOfPages;
    
        for (let i = 0; i < numberOfButtons; i++) {
    
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="?page=${i + 1}">${i + 1}</a>
            </li>
            `);
    
        }
    
        if (response.numberOfPages > numberOfButtons) {
    
            $("ul.pagination").append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
            `);
    
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="?page=${response.numberOfPages}">${response.numberOfPages}</a>
            </li>
            `);
    
        }
    
    
        if (response.page + 1 > response.numberOfPages) {
    
            $("ul.pagination").append(`
            <li class="page-item disabled">
                <a class="page-link">Siguiente</a>
            </li>
            `);
    
        }
        else {
    
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="?page=${parseInt(response.page) + 1}">Siguiente</a>
            </li>
            `);
    
        }

    }

}).fail(function(jqXHR, state, error) {
    console.log("Ups...algo salio mal: " + state);
});



$(document).ready(function() {


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