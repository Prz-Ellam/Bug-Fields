const form = document.getElementById('login-form');
const btnSubmit = document.getElementById('btn-submit');

const showPassword = document.getElementById('show-password');
const hidePassword = document.getElementById('hide-password');
const inputPassword = document.getElementById('password');


form.addEventListener('submit', (e) => {

    let errors = false;

    let username = form['username'];
    let password = form['password'];

    if (username.value === '') {
        username.classList.add('form-input-incorrect');

        const usernameErrorLabel = document.getElementById('username-error');
        const usernameWarning = document.getElementById('username-warning');

        usernameErrorLabel.style.display = 'block';
        usernameWarning.style.visibility = 'visible';
        errors = true;
    }

    if (password.value === '') {
        password.classList.add('form-input-incorrect');

        const passwordErrorLabel = document.getElementById('password-error');
        const passwordWarning = document.getElementById('password-warning');

        passwordErrorLabel.style.display = 'block';
        passwordWarning.style.visibility = 'visible';
        errors = true;
    }


    // Solo letras del alfabeto
    //var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

    // Solo letras del alfabeto y numeros
    //var rgxAlphaNum = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

    // Solo hay espacios en blanco
    //var rgxWhitespaces = /^\s*$/; 


/*
    if (errors) {
        e.preventDefault();
        return;
    }
*/

    /*
    //Username
    if (!username.value.match(rgxAlphaNum) || username.value.match(rgxWhitespaces)) {

    }

    // Password
    if (password.value != confirmPassword.value) {
        // Error, la contraseña no es igual
    }
    */

    e.preventDefault();
    
});


showPassword.onclick = function() {
    showPassword.style.visibility = 'hidden';
    hidePassword.style.visibility = 'visible';
    inputPassword.setAttribute('type', 'text');
}

hidePassword.onclick = function() {
    showPassword.style.visibility = 'visible';
    hidePassword.style.visibility = 'hidden';
    inputPassword.setAttribute('type', 'password');
}