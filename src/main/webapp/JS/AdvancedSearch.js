import closeSession from "./Utils/CloseSession.js";

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
        $.each(data.categories, function(i, e) {
            $("#categories").append(`<option value="${e.categoryId}"> ${e.name}</option>`);
        });
    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});


$.ajax({
    async: false,
    data: window.location.search.substring(1),
    type: "POST",
    url: "GetPostsByAdvancedSearch",
    dataType: "json"
}).done(data => {

    if (data.status) {

        $("#dashboard").empty();

        $.each(data.posts, function(i, e) {
            let html = `
            <section>
                <div class="container mt-5">
                    <article class="card bg-light m-4 p-4 rounded-3">
                    ${e.userOwn ? `<a href="modifyPost.html?id=${e.postId}"` : `<a href="ViewPost.html?id=${e.postId}"`} class="card-title" id="${e.postId}">${e.title}</a>
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
    
                        ${e.userOwn ?

                            `<div class="card-footer m-0 p-2 text-right">
                                <a class="delete btn btn-danger" href="deletePost.html?id=${e.postId}">Eliminar</a>
                            </div>` : ``
                        }
    
                    </article>
                </div>
            </section>
            `;

            $("#dashboard").append(html);
        });
        
        let category = new URLSearchParams(window.location.search).get("category");
        if (category !== null) {
            $(`option[value="${category}"`).attr("selected", "selected");
        }
        
        let filter = new URLSearchParams(window.location.search).get("search");
        if (filter !== null) {
            $(`#search-input`).val(filter);
        }

        let startDate = new URLSearchParams(window.location.search).get("start");
        if (startDate !== null) {
            $(`#start-date`).val(startDate);
        }

        let endDate = new URLSearchParams(window.location.search).get("end");
        if (startDate !== null) {
            $(`#end-date`).val(endDate);
        }
        
        if (data.page > 1) {
            
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', data.page - 1);
            
            $("ul.pagination").append(`
            <li class="page-item">
            <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">Anterior</a>
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

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', i + 1);

        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">${i + 1}</a>
        </li>
        `);

    }

    if (data.numberOfPages > numberOfButtons) {

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', data.numberOfPages);

        $("ul.pagination").append(`
        <li class="page-item disabled">
            <span class="page-link">...</span>
        </li>
        `);

        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">${data.numberOfPages}</a>
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

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', parseInt(data.page) + 1);

        $("ul.pagination").append(`
        <li class="page-item">
            <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">Siguiente</a>
        </li>
        `);

    }

    }

    
}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});


$(document).ready(function() {

    $("#advanced-search").submit( function(e) {
        
        e.preventDefault();
        
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: "GetPostsByAdvancedSearch",
            dataType: "json"
       }).done(data => {

        if (data.status) {

            $("#dashboard").empty();
            $("ul.pagination").empty();
            
            $.each(data.posts, function(i, e) {
                let html = `
                <section>
                    <div class="container mt-5">
                        <article class="card bg-light m-4 p-4 rounded-3">
                        ${e.userOwn ? `<a href="modifyPost.html?id=${e.postId}"` : `<a href="ViewPost.html?id=${e.postId}"`} class="card-title" id="${e.postId}">${e.title}</a>
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
        
                            ${e.userOwn ?
    
                                `<div class="card-footer m-0 p-2 text-right">
                                    <a class="delete btn btn-danger" href="deletePost.html?id=${e.postId}">Eliminar</a>
                                </div>` : ``
                            }
        
                        </article>
                    </div>
                </section>
                `;
    
                $("#dashboard").append(html);
            });

        }

        window.history.pushState( {} , "", "AdvancedSearch.html?" + $(this).serialize());

        if (data.page > 1) {

            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', data.page - 1);
            
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">Anterior</a>
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
    
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', i + 1);
    
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">${i + 1}</a>
            </li>
            `);
    
        }
    
        if (data.numberOfPages > numberOfButtons) {
    
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', data.numberOfPages);
    
            $("ul.pagination").append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
            `);
    
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">${data.numberOfPages}</a>
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
    
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', parseInt(data.page) + 1);
    
            $("ul.pagination").append(`
            <li class="page-item">
                <a class="page-link" href="AdvancedSearch.html?${urlParams.toString()}">Siguiente</a>
            </li>
            `);
    
        }

       }).fail(function(jqXHR, state) {
        console.log("Ups...algo salio mal: " + state);
       });


    });

    $(document).on('click', '#close-session', function() {
        closeSession();
    });

});