const pictureBox = document.getElementById('picture-box');

const form = document.getElementById('register-form');
const btnSubmit = document.getElementById('btn-submit');

const showPassword = document.getElementById('show-password');
const hidePassword = document.getElementById('hide-password');
const inputPassword = document.getElementById('password');

var regexX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;

/*
names.onclick = function() {
    nameWarning.style.visibility = null;
    nameErrorLabel.style.display = null;
    names.style.border = null;
    names.style.transition = null;
}
*/
photo.onchange = function(e) {

    let fReader = new FileReader();
    fReader.readAsDataURL(photo.files[0]);
    fReader.onloadend = function(e) {
        let img = document.getElementById('picture-box');
        img.setAttribute('src', e.target.result);
        pictureBox.style.opacity = '1';
        photo.style.opacity = '0';
    }

}
/*
photo.onclick = function() {

    let fReader = new FileReader();
    fReader.readAsDataURL(photo.files[0]);
    fReader.onloadend = function(e) {
        let img = document.getElementById('picture-box');
        img.setAttribute('src', e.target.result);
        //img.src = e.target.result;
    }

}
*/
form.addEventListener('submit', (e) => {

    let errors = false;

    let name = form['name'];
    let lastName = form['last-name'];
    let email = form['email'];
    let username = form['username'];
    let password = form['password'];
    let confirmPassword = form['confirm-password'];
    let dateOfBirth = form['date-of-birth'];
    let photo = form['photo'];


    if (name.value === '') {
        name.classList.add('form-input-incorrect');
        const nameErrorLabel = document.getElementById('name-error');
        const nameWarning = document.getElementById('name-warning');
        nameErrorLabel.style.display = 'block';
        nameWarning.style.visibility = 'visible';
        errors = true;
    }


    if (lastName.value === '') {
        lastName.classList.add('form-input-incorrect');

        const lastNameErrorLabel = document.getElementById('last-name-error');
        const lastNameWarning = document.getElementById('last-name-warning');
        lastNameErrorLabel.style.display = 'block';
        lastNameWarning.style.visibility = 'visible';
        
        errors = true;
    }

    if (email.value === '') {
        email.classList.add('form-input-incorrect');

        const emailErrorLabel = document.getElementById('email-error');
        const emailWarning = document.getElementById('email-warning');

        emailErrorLabel.style.display = 'block';
        emailWarning.style.visibility = 'visible';
        errors = true;
    }

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

    if (confirmPassword.value === '') {
        confirmPassword.classList.add('form-input-incorrect');

        const confirmPasswordErrorLabel = document.getElementById('confirm-password-error');
        const confirmPasswordWarning = document.getElementById('confirm-password-warning');

        confirmPasswordErrorLabel.style.display = 'block';
        confirmPasswordWarning.style.visibility = 'visible';
        errors = true;
    }


    // Solo letras del alfabeto
    var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

    // Solo letras del alfabeto y numeros
    var rgxAlphaNum = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

    // Solo hay espacios en blanco
    var rgxWhitespaces = /^\s*$/; 

    let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/*
    if (errors) {
        e.preventDefault();
        return;
    }
*/


    // Solo alfabeto y que no haya espacios en blanco solamente
    if (!name.value.match(rgxAlphas) || name.value.match(rgxWhitespaces)) {
        const nameErrorLabel = document.getElementById('name-error');
        nameErrorLabel.style.display = 'block';
    }

    if (!lastName.value.match(rgxAlphas) || lastName.value.match(rgxWhitespaces)) {
        const lastNameErrorLabel = document.getElementById('name-error');
        lastNameErrorLabel.style.display = 'block';
    }

    if (!username.value.match(rgxAlphaNum) || username.value.match(rgxWhitespaces)) {

    }

    if (!email.value.match(rgxEmail) || email.value.match(rgxWhitespaces)) {
        
    }

    // Password
    let results = validatePassword(password);

    if (password.value != confirmPassword.value) {
        // Error, la contraseña no es igual
    }

    e.preventDefault();
    
});


function validatePassword(password) {

    let msg = '';
    let checks = new Map([['Upper', false], 
                        ['Lower', false], 
                        ['Number', false], 
                        ['Lenght', false]]);

    if (password.match(/([A-Z])/)) {
        msg += ' una mayúscula';
        checks.set('Upper', true);
        console.log('Mayuscula');
    }
    if (password.match(/([a-z])/)) {
        msg += ' una minuscula';
        checks.set('Lower', true);
        console.log('Minuscula');
    }
    if (password.match(/([0-9])/)) {
        msg += ' un número';
        checks.set('Number', true);
        console.log('Numero');
    }
    if (password.length === 8) {
        msg += ' y un tamaño mínimo de 8 caracteres';
        checks.set('Length', true);
        console.log('Tamanio');
    }

    console.log(msg);
    return checks;

}

validatePassword('9a');


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