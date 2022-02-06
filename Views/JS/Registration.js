const pictureBox = document.getElementById('picture-box');

const form = document.getElementById('register-form');
const btnSubmit = document.getElementById('btn-submit');

const showPassword = document.getElementById('show-password');
const hidePassword = document.getElementById('hide-password');
const inputPassword = document.getElementById('password');

var regexX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;

var rgxAlphanum = /^[a-zA-Z \u00C0-\u00FF]+$/;
var rgxWhitespaces = /^\s*$/; 
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
        lastNameErrorLabel.style.display = 'block';
        const lastNameWarning = document.getElementById('last-name-warning');
        lastNameWarning.style.visibility = 'visible';
        errors = true;
    }

    if (email.value === '') {
        email.classList.add('form-input-incorrect');

        const emailErrorLabel = document.getElementById('email-error');
        emailErrorLabel.style.display = 'block';
        const emailWarning = document.getElementById('email-warning');
        emailWarning.style.visibility = 'visible';
        errors = true;
    }

    if (username.value === '') {
        username.classList.add('form-input-incorrect');

        const usernameErrorLabel = document.getElementById('username-error');
        usernameErrorLabel.style.display = 'block';
        const usernameWarning = document.getElementById('username-warning');
        usernameWarning.style.visibility = 'visible';
        errors = true;
    }

    if (password.value === '') {
        password.classList.add('form-input-incorrect');

        const passwordErrorLabel = document.getElementById('password-error');
        passwordErrorLabel.style.display = 'block';
        const passwordWarning = document.getElementById('password-warning');
        passwordWarning.style.visibility = 'visible';
        errors = true;
    }

    if (confirmPassword.value === '') {
        confirmPassword.classList.add('form-input-incorrect');
        
        const confirmPasswordErrorLabel = document.getElementById('confirm-password-error');
        confirmPasswordErrorLabel.style.display = 'block';
        const confirmPasswordWarning = document.getElementById('confirm-password-warning');
        confirmPasswordWarning.style.visibility = 'visible';
        errors = true;
    }

    if (errors) {
        e.preventDefault();
        return;
    }

    if (!Boolean(rgxAlphanum.exec(names.value)) || Boolean(rgxWhitespaces.exec(names.value))) {
        const nameErrorLabel = document.getElementById('name-error');
        nameErrorLabel.style.display = 'block';
    }

    if (password.value != confirmPassword.value) {
        // Error
    }

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