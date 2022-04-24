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


$.ajax({
    async: false,
    data: window.location.search.substring(1),
    type: "POST",
    url: "GetPostsByAdvancedSearch",
    dataType: "json"
}).done(data => {

    if (data.status) {

        $("#dashboard").empty();
        
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

            $("#dashboard").append(html);

        }

        let category = new URLSearchParams(window.location.search).get("category");
        if (category !== null) {
            $(`option[value="${category}"`).attr("selected", "selected");
        }
        
        let filter = new URLSearchParams(window.location.search).get("search");
        if (filter !== null) {
            $(`#search-input`).val(filter);
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
    
        
                $("#dashboard").append(html);
            }

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



});


/*

const urlParams = new URLSearchParams(window.location.search.substring(1));
    urlParams.set('page', 2);
    console.log(urlParams.toString());


*/ 