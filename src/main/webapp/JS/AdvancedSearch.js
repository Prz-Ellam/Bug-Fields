$.ajax({
    data: { "search-query" : new URLSearchParams(window.location.search).get("search-query"), },
    type: "POST",
    dataType: "json",
    url: "SearchBoxController"
}).done(function(data) {

    if (!data.status) {
        window.location.href = "index.html";
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
                        <p class="card-body">Descripción Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis reprehenderit hic commodi eius! Porro tenetur optio, ex nobis quod excepturi debitis dignissimos deleniti quidem? Sit dolor velit quas id perferendis?</p>
                        
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

});