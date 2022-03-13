var date = new Date();
var dateFormat = date.getFullYear() + '-' + 
String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
document.getElementById('date-of-birth').value = dateFormat;
//document.getElementById('date-of-birth').setAttribute('max', dateFormat);

photo.onchange = function(e) {

    let fReader = new FileReader();
    fReader.readAsDataURL(photo.files[0]);
    fReader.onloadend = function(e) {
        let img = document.getElementById('picture-box');
        img.setAttribute('src', e.target.result);
        img.style.opacity = '1';
        photo.style.opacity = '0';
    }

}

// Solo letras del alfabeto
var rgxAlphas = /^[a-zA-Z \u00C0-\u00FF]+$/;

// Solo letras del alfabeto y numeros
var rgxUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

// Solo hay espacios en blanco
var rgxWhitespaces = /^\s*$/;

// Validar formato de email
let rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validateName(input) {

    if (input.value === '') {
        setMessageError(input, 'Nombre(s) no puede estar vacío.');
        return 1;
    }

    if (!input.value.match(rgxAlphas) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Nombre(s) no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateLastName(input) {

    if (input.value === '') {
        setMessageError(input, 'Apellidos no puede estar vacío.');
        return 1;
    }

    if (!input.value.match(rgxAlphas) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Apellidos no válido.');
        return 1;
    }
    
    setMessageSuccess(input);
    return 0;

}

function validateDateOfBirth(input) {

    if (input.value === '') {
        setMessageError(input, 'Fecha de nacimiento no válida.');
        return 1;
    }

    if (Date.parse(input.value) > Date.parse(dateFormat) || Date.parse(input.value) < Date.parse('1900-01-01')) {
        setMessageError(input, 'Fecha de nacimiento no válida.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateEmail(input) {

    if (input.value === '') {
        setMessageError(input, 'Correo electrónico no puede estar vacío.');
        return 1;
    }

    else if (!input.value.match(rgxEmail) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Correo electrónico no válido.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validateUsername(input) {

    if (input.value === '') {
        setMessageError(input, 'Nombre de usuario no puede estar vacío.');
        return 1;
    }
    if (!input.value.match(rgxUsername) || input.value.match(rgxWhitespaces)) {
        setMessageError(input, 'Nombre de usuario no válido.');
        return 1;
    }
    
    setMessageSuccess(input);
    return 0;

}

function validatePassword(input) {

    if (input.value === '') {
        setMessageError(input, 'Contraseña no puede estar vacía.');
        let upper = document.getElementById('field-password-upper');
        let lower = document.getElementById('field-password-lower');
        let number = document.getElementById('field-password-number');
        let symbol = document.getElementById('field-password-symbol');
        let length = document.getElementById('field-password-length');
        upper.style.color = 'rgb(222, 79, 84)';
        lower.style.color = 'rgb(222, 79, 84)';
        number.style.color = 'rgb(222, 79, 84)';
        symbol.style.color = 'rgb(222, 79, 84)';
        length.style.color = 'rgb(222, 79, 84)';
        return 1;
    }

    if (!checkPassword(input.value)) {
        setMessageError(input, 'Contraseña no válida.');
        return 1;
    }
    
    setMessageSuccess(input);
    return 0;

}

function validateConfirmPassword(input) {

    if (input.value === '') {
        setMessageError(input, 'Confirmar contraseña no puede estar vacío.');
        return 1;
    }
    if (document.getElementById('password').value != input.value) {
        setMessageError(input, 'Confirmar contraseña no coincide con contraseña.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

document.getElementById('first-name').addEventListener('blur', function() {
    validateName(this);
});

document.getElementById('first-name').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('last-name').addEventListener('blur', function() {
    validateLastName(this);
});

document.getElementById('last-name').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('date-of-birth').addEventListener('blur', function() {
    validateDateOfBirth(this); 
});

document.getElementById('date-of-birth').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('email').addEventListener('blur', function() {
    validateEmail(this)
});

document.getElementById('email').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('username').addEventListener('blur', function() {
    validateUsername(this);
});

document.getElementById('username').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('password').addEventListener('blur', function() {
    validatePassword(this)
});

document.getElementById('password').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('confirm-password').addEventListener('blur', function() {
    validateConfirmPassword(this);
});

document.getElementById('confirm-password').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('register-form').addEventListener('submit', (e) => {

    // Obtain inputs
    let photo = this['photo'];
    let name = this['first-name'];
    let lastName = this['last-name'];
    let dateOfBirth = this['date-of-birth'];
    let email = this['email'];
    let username = this['username'];
    let password = this['password'];
    let confirmPassword = this['confirm-password'];

    let result = 0;
    if(photo.value === ''){
        setMessageErrorOnPhoto();
        result += 1;
    }else{
        setMessageSuccessOnPhoto();
    }

    result += validateName(name);
    result += validateLastName(lastName);
    result += validateDateOfBirth(dateOfBirth);
    result += validateEmail(email);
    result += validateUsername(username);
    result += validatePassword(password);
    result += validateConfirmPassword(confirmPassword);

    if (result > 0) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

});

function setMessageSuccess(input) {

    let fieldWrapper = input.parentElement.parentElement;

    let fieldError = fieldWrapper.children[2];
    let inputWarning = fieldWrapper.children[1].children[1];
    let inputSucess = fieldWrapper.children[1].children[2];

    fieldError.style.display = 'none';
    fieldError.innerHTML = '';

    inputWarning.style.visibility = 'hidden';
    inputSucess.style.visibility = 'visible';

    input.classList.add('input-correct');
    input.classList.remove('input-incorrect');

}

function setMessageError(input, errorMessage) {

    let fieldWrapper = input.parentElement.parentElement;

    let fieldError = fieldWrapper.children[2];
    let inputWarning = fieldWrapper.children[1].children[1];
    let inputSucess = fieldWrapper.children[1].children[2];
    
    fieldError.style.display = 'block';
    fieldError.innerHTML =  errorMessage;

    inputWarning.style.visibility = 'visible';
    inputSucess.style.visibility = 'hidden';

    input.classList.add('input-incorrect');
    input.classList.remove('input-correct');

}

function onFocus(input) {

    let fieldWrapper = input.parentElement.parentElement;

    let fieldError = fieldWrapper.children[2];
    let inputWarning = fieldWrapper.children[1].children[1];
    let inputSucess = fieldWrapper.children[1].children[2];

    fieldError.style.display = 'none';
    fieldError.innerHTML = '';

    inputWarning.style.visibility = 'hidden';
    inputSucess.style.visibility = 'hidden';

}

function checkPassword(password) {

    let result = true;

    let upper = document.getElementById('field-password-upper');
    let lower = document.getElementById('field-password-lower');
    let number = document.getElementById('field-password-number');
    let symbol = document.getElementById('field-password-symbol');
    let length = document.getElementById('field-password-length');

    if (!password.match(/([A-Z])/)) {
        upper.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        upper.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/([a-z])/)) {
        lower.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        lower.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/([0-9])/)) {
        number.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        number.style.color = 'rgb(121, 177, 143)';
    }

    if (!password.match(/[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/)) {
        symbol.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        symbol.style.color = 'rgb(121, 177, 143)';
    }

    if (password.length < 8) {
        length.style.color = 'rgb(222, 79, 84)';
        result = false;
    }
    else {
        length.style.color = 'rgb(121, 177, 143)';
    }

    return result;

}

function setMessageErrorOnPhoto(){
    let photoMessage =  document.getElementById('photo-error');
    photoMessage.style.display = 'block';
    photoMessage.style.color = 'rgb(222, 78, 84)';
}

function setMessageSuccessOnPhoto(){
    let photoMessage =  document.getElementById('photo-error');
    photoMessage.style.display = 'none';
}


// FORM BUSQUEDA NAVBAR

function validateSearching(){

    if($("#search-input").val() === ""){
        return 1;      
    }else if(!$("#search-input").val().match(rgxAlphas) || $("#search-input").val().match(rgxWhitespaces)){
        return 1;
    }else
        return 0;

}

$("#SearchForm").submit(function(e){

    let search = $("#search-input").val();

    let result = 0;
    result += validateSearching(search);

    if(result > 0){
        e.preventDefault();
        alert("Búsqueda no válida.");
    }

});