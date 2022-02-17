var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
document.getElementById('date-of-birth').value = dateFormat;

const pictureBox = document.getElementById('picture-box');

const form = document.getElementById('register-form');
const btnSubmit = document.getElementById('btn-submit');

const showPassword = document.getElementById('show-password');
const hidePassword = document.getElementById('hide-password');
const inputPassword = document.getElementById('password');

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

    // Validar formato de email
    let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    

    if (name.value === '') {
        setMessageError(name, 'Nombre(s) no puede estar vacío.');
    }
    else if (!name.value.match(rgxAlphas) || name.value.match(rgxWhitespaces)) {
        setMessageError(name, 'Nombre(s) no válido.');
    }
    else {
        setMessageSuccess(name);
    }

    if (lastName.value === '') {
        setMessageError(lastName, 'Apellidos no puede estar vacío.');
    }
    else if (!lastName.value.match(rgxAlphas) || lastName.value.match(rgxWhitespaces)) {
        setMessageError(name, 'Apellidos no válido.');
    }
    else {
        setMessageSuccess(lastName);
    }

    if(Date.parse(dateFormat) < Date.parse(dateOfBirth.value)){
        setMessageError(dateOfBirth, 'Fecha de nacimiento no válida.');
    }
    else {
        setMessageSuccess(dateOfBirth)
    }

    if (email.value === '') {
        setMessageError(email, 'Correo electrónico no puede estar vacío.');
    }
    else if (!email.value.match(rgxEmail) || email.value.match(rgxWhitespaces)) {
        setMessageError(email, 'Correo electrónico no válido.');
    }
    else {
        setMessageSuccess(email);
    }

    if (username.value === '') {
        setMessageError(username, 'Nombre de usuario no puede estar vacío.');
    }
    else if (!username.value.match(rgxAlphaNum) || lastName.value.match(rgxWhitespaces)) {
        setMessageError(username, 'Nombre de usuario no válido.');
    }
    else {
        setMessageSuccess(username);
    }

    if (password.value === '') {
        setMessageError(password, 'Contraseña no puede estar vacío.');
    }
    else if (!validatePassword(password.value)) {
        setMessageError(password, 'Contraseña no válida');
    }
    else {
        setMessageSuccess(password);
    }

    if (confirmPassword.value === '') {
        setMessageError(confirmPassword, 'Confirmar contraseña no puede estar vacío.');
    }
    else if (password.value != confirmPassword) {
        setMessageError(confirmPassword, 'Confirmar contraseña no coincide con contraseña');
    }
    else {
        setMessageSuccess(confirmPassword);
    }

    // Password
    // let results = validatePassword(password);

    e.preventDefault();
});

function setMessageError(input, errorMessage) {

    let fieldWrapper = input.parentElement.parentElement;

    let fieldError = fieldWrapper.children[2];
    let inputWarning = fieldWrapper.children[1].children[1];
    
    fieldError.style.display = 'block';
    fieldError.innerHTML =  errorMessage;
    inputWarning.style.visibility = 'visible';
    input.classList.add('input-incorrect');

}

function setMessageSuccess(input) {

    let inputWrapper = input.parentElement;
    let inputSucess = inputWrapper.children[2];

    inputSucess.style.visibility = 'visible';
    input.classList.remove('input-incorrect');

}


function validatePassword(password) {

    let msg = 'Contraseña debe contener:';
    let result = true;

    if (!password.match(/([A-Z])/)) {
        let upper = document.getElementById('field-password-upper');
        upper.style.color = 'rgb(222, 79, 84)';
        msg += ' una mayúscula';
        result = false;
    }
    else {
        let upper = document.getElementById('field-password-upper');
        upper.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/([a-z])/)) {
        let lower = document.getElementById('field-password-lower');
        lower.style.color = 'rgb(222, 79, 84)';
        msg += ', una minúscula';
        result = false;
    }
    else {
        let lower = document.getElementById('field-password-lower');
        lower.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/([0-9])/)) {
        let number = document.getElementById('field-password-number');
        number.style.color = 'rgb(222, 79, 84)';
        msg += ', un número';
        result = false;
    }
    else {
        let number = document.getElementById('field-password-number');
        number.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/[.,\/#!$%\^&\*;:{}=\-_`~()”“"…]/)) {
        let symbol = document.getElementById('field-password-symbol');
        symbol.style.color = 'rgb(222, 79, 84)';
        msg += ", un símbolo";
        result = false;
    }
    else {
        let symbol = document.getElementById('field-password-symbol');
        symbol.style.color = 'rgb(121, 177, 143)';
    }

    if (password.length < 8) {
        let length = document.getElementById('field-password-length');
        length.style.color = 'rgb(222, 79, 84)';
        msg += ' y un tamaño mínimo de 8 caracteres';
        result = false;
    }
    else {
        let length = document.getElementById('field-password-length');
        length.style.color = 'rgb(121, 177, 143)';
    }

    return result;

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