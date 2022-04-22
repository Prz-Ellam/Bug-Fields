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

$.ajax({
    data: { "search-query" : new URLSearchParams(window.location.search).get("search-query"), },
    type: "POST",
    dataType: "json",
    url: "SearchBoxController"
}).done(function(data) {

    if (!data.status) {
        //window.location.href = "index.html";
    }
    else {

        let posts = data.posts;

        for (let i = 0; i < posts.length; i++) {

            const html = `
            <section>
                <div class="container mt-5">
                    <article class="card bg-light m-4 p-4 rounded-3">
                        <a href="#" class="card-title">${posts[i].title}</a>
                        <h6 class="card-subtitle text-muted">por: ${posts[i].username}</h5>
                        <p class="card-body description" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">${posts[i].description}</p>
                        
                        <div class="card-text text-right">
                            <p><small class="text-muted">Creada: ${posts[i].creationDate}</small></p>
                        </div>
                    </article>
                </div>
            </section>
            `;

            $("main").append(html);

        }

    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});

$(document).ready(function() {

    $("#date-filter").submit( function(e) {

        e.preventDefault();
       alert($(this).serialize());
    });

    $("#category-filter").submit( function(e) {

        e.preventDefault();
        alert($(this).serialize());
     });

     $("#like-filter").submit( function(e) {

        e.preventDefault();
        alert($(this).serialize());
     });


});