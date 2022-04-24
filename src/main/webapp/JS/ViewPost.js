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
    data: { "id" : new URLSearchParams(window.location.search).get("id"), },
    async: false,
    type: "GET",
    dataType: "json",
    url: "GetPostForRead"
}).done(function(data) {

    if (data.status) {

        $("#title").html(data.post.title);
        $("#author").html(data.post.username);
        $("#description").html(data.post.description);

        let html = '';
        for (let j = 0; j < data.categories.length; j++) {

            html +=  `
            <a href="AdvancedSearch.html?category=${data.categories[j].categoryId}&start=&end=&search=" class="btn btn-outline-primary p-0">${data.categories[j].name}</a>
            `;

        }
        $("#categories").append(html);

        $("#date-creation").html(data.post.creationDate);

    }
    else {

        window.location.href = "index.html";

    }

}).fail(function(jqXHR, state) {
    console.log("Ups...algo salio mal: " + state);
});