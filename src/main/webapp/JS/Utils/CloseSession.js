export default function closeSession() {
    return new Promise(resolve => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "CloseSession"
        }).done(function(response) {
            if (response.result) {
                window.location.href = "index.html";
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pudo cerrar la sesión',
                    confirmButtonColor: "#de4f54",
                    background: "#EFEFEF"
                });
            }
        }).fail(function(jqXHR, state) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo salió mal',
                confirmButtonColor: "#de4f54",
                background: "#EFEFEF"
            });
        });
    })
}