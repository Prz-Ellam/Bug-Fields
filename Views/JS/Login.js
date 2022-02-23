
function validateUsername(input) {

    if (input.value === '') {
        setMessageError(input, 'Nombre de usuario no puede estar vacío.');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

function validatePassword(input) {

    if (input.value === '') {
        setMessageError(input, 'Contraseña no puede estar vacía');
        return 1;
    }

    setMessageSuccess(input);
    return 0;

}

document.getElementById('username').addEventListener('blur', function() {
    validateUsername(this);
});

document.getElementById('username').addEventListener('focus', function() {
    onFocus(this);
});

document.getElementById('password').addEventListener('blur', function() {
    validatePassword(this);
});

document.getElementById('password').addEventListener('focus', function() {
    onFocus(this);
});


document.getElementById('login-form').addEventListener('submit', (e) => {

    let username = this['username'];
    let password = this['password'];

    let result = 0;
    result += validateUsername(username);
    result += validatePassword(password);

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