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

    // Obtain inputs
    let photo = form['photo'];
    let name = form['name'];
    let lastName = form['last-name'];
    let dateOfBirth = form['date-of-birth'];
    let email = form['email'];
    let username = form['username'];
    let password = form['password'];
    let confirmPassword = form['confirm-password'];

    // Solo letras del alfabeto
    var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

    // Solo letras del alfabeto y numeros
    var rgxAlphaNum = /^[a-zA-Z0-9 \u00C0-\u00FF]+$/;

    // Solo hay espacios en blanco
    var rgxWhitespaces = /^\s*$/; 

    let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    

    if (name.value === '') {
        SetMessageError(name, 'Nombre(s) no puede estar vacío.');
    }
    else if (!name.value.match(rgxAlphas) || name.value.match(rgxWhitespaces)) {
        SetMessageError(name, 'Nombre(s) no válido.');
    }
    else {
        SetMessageSuccess(name);
    }

    if (lastName.value === '') {
        SetMessageError(lastName, 'Apellidos no puede estar vacío.');
    }
    else if (!lastName.value.match(rgxAlphas) || lastName.value.match(rgxWhitespaces)) {
        SetMessageError(name, 'Apellidos no válido.');
    }
    else {
        SetMessageSuccess(lastName);
    }

    if (email.value === '') {
        SetMessageError(email, 'Correo electrónico no puede estar vacío.');
    }
    else if (!email.value.match(rgxEmail) || email.value.match(rgxWhitespaces)) {
        SetMessageError(email, 'Correo electrónico no válido.');
    }
    else {
        SetMessageSuccess(email);
    }

    if (username.value === '') {
        SetMessageError(username, 'Nombre de usuario no puede estar vacío.');
    }
    else if (!username.value.match(rgxAlphaNum) || lastName.value.match(rgxWhitespaces)) {
        SetMessageError(username, 'Nombre de usuario no válido.');
    }
    else {
        SetMessageSuccess(username);
    }

    if (password.value === '') {
        SetMessageError(password, 'Contraseña no puede estar vacío.');
    }
    else if (password.length === 8) {

    }
    else if (password.match(/([A-Z])/)) {

    }
    else if (password.match(/([a-z])/)) {

    }
    else if (password.match(/([0-9])/)) {

    }

    if (confirmPassword.validatePassword === '') {
        SetMessageError(confirmPassword, 'Confirmar contraseña no puede estar vacío.');
    }
    else if (password.value != confirmPassword) {
        SetMessageError(confirmPassword, 'Verificar contraseña');
    }
    else {
        SetMessageSuccess(confirmPassword);
    }

    // Password
    // let results = validatePassword(password);

    e.preventDefault();
    
});

function SetMessageError(input, errorMessage) {

    let fieldWrapper = input.parentElement.parentElement;

    let fieldError = fieldWrapper.children[2];
    let inputWarning = fieldWrapper.children[1].children[1];
    
    fieldError.style.display = 'block';
    fieldError.innerHTML =  errorMessage;
    inputWarning.style.visibility = 'visible';
    input.classList.add('input-incorrect');

}

function SetMessageSuccess(input) {

    let inputWrapper = input.parentElement;
    let inputSucess = inputWrapper.children[2];

    inputSucess.style.visibility = 'visible';
    input.classList.remove('input-incorrect');

}


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