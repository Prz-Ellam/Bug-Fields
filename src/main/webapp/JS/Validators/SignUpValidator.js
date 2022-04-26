import GenericValidator from "./GenericValidator.js";

export default class SignUpValidator extends GenericValidator {

    constructor(formID, dateFormat) {

        super(formID);
        this.formID = formID;

        $.validator.addMethod("fileSize", function(value, element, parameter) {

            let result;
            if (element.files[0] === undefined) {
                return this.optional(element) || result; 
            }

            const size = (element.files[0].size / 1024 / 1024).toFixed(2);

            result =  (size > 5.0) ? false : true;
 
            return this.optional(element) || result; 
        }, "invalido");

        $.validator.addMethod("whitespaces", function(value, element, parameter) {
            return this.optional(element) || !/^\s*$/.test(value);
        }, 'El correo electrónico no puede estar vacío');
    
        $.validator.addMethod("alphas", function(value, element, parameter) {
            return this.optional(element) || /^[a-zA-Z \u00C0-\u00FF]+$/.test(value);
        }, 'invalido');
    
        $.validator.addMethod("username", function(value, element, parameter) {
            return this.optional(element) || /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/.test(value);
        }, 'invalido');
        
        $.validator.addMethod("emailForm", function(value, element, parameter) {
            return this.optional(element) || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        }, 'invalido');
    
        $.validator.addMethod("daterange", function(value, element, parameter) {
            return this.optional(element) ||
            !(Date.parse(value) > Date.parse(parameter[1]) || Date.parse(value) < Date.parse(parameter[0]));
        }, 'fecha invalida');
        
        $.validator.addMethod('passwordForm', function(value, element, parameter) {
            return this.optional(element) || $('#password').val() == value;
        }, 'invalido');

        $.validator.addMethod('duplicateUsername', function(value, element, parameter) {
        
            let result;
            $.ajax({
                async: false,
                data: {"username":value},
                type: "POST",
                dataType: "json",
                url: "VerifyUsernameExists"
            }).done(function(data) {
                result = !data.exists;
            }).fail(function(jqXHR, state) {
                console.log("Ups...algo salio mal: " + state);
            });
            
            return this.optional(element) || result;
        }, 'invalido');

        $.validator.addMethod('duplicateEmail', function(value, element, parameter) {
        
            let result;
            $.ajax({
                async: false,
                data: { "email" : value },
                type: "POST",
                dataType: "json",
                url: "EmailExists"
            }).done(function(data) {
                result = !data.status;
            }).fail(function(jqXHR, state) {
                console.log("Ups...algo salio mal: " + state);
            });
            
            return this.optional(element) || result;
        }, 'invalido');
        
        $.validator.addMethod('passwordRequirements', function(value, element, parameter) {
            let upper = this.optional(element) || /([A-Z])/.test(value);
            let lower = this.optional(element) || /([a-z])/.test(value);
            let number = this.optional(element) || /([0-9])/.test(value);
            let symbol = this.optional(element) || /[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/.test(value);
            let length = this.optional(element) || value.length > 7;
           
            return upper && lower && number && symbol && length;
        }, 'invalido');

        $(formID).validate({
            rules: {
                photo: {
                    required: true,
                    fileSize: true
                },
                "first-name": {
                    required: true,
                    whitespaces: true,
                    alphas: true,
                    maxlength: 50
                },
                "last-name": {
                    required: true,
                    whitespaces: true,
                    alphas: true,
                    maxlength: 50
                },
                "date-of-birth": {
                    required: true,
                    whitespaces: true,
                    date: true,
                    daterange: ['1900-01-01', dateFormat]
                },
                email: {
                    required: true,
                    whitespaces: true,
                    emailForm: true,
                    duplicateEmail: true,
                    maxlength: 50
                },
                username: {
                    required: true,
                    whitespaces: true,
                    username: true,
                    duplicateUsername: true
                },
                password: {
                    required: true,
                    whitespaces: true,
                    passwordRequirements: true,
                    maxlength: 50
                },
                "confirm-password": {
                    required: true,
                    whitespaces: true,
                    passwordForm: true
                }
            },
            messages: {
                photo: {
                    required: 'La foto de perfil no puede estar vacía.',
                    fileSize: "La foto de perfil es muy pesada."
                },
                "first-name": {
                    required: 'El nombre no puede estar vacío.',
                    whitespaces: 'El nombre no puede estar vacío.',
                    alphas: 'El nombre no es válido.',
                    maxlength: "El nombre es demasiado largo."
                },
                "last-name": {
                    required: 'El apellido no puede estar vacío.',
                    whitespaces: 'El apellido no puede estar vacío.',
                    alphas: 'El apellido no es válido.',
                    maxlength: "El apellido es demasiado largo."
                },
                "date-of-birth": {
                    required: 'La fecha de nacimiento no puede estar vacía.',
                    whitespaces: 'La fecha de nacimiento no puede estar vacía.',
                    date: 'La fecha de nacimiento no es válida',
                    daterange: 'La fecha de nacimiento no es válida'
                },
                email: {
                    required: 'El correo electrónico no puede estar vacío.',
                    whitespaces: 'El correo electrónico no puede estar vacío.',
                    emailForm: 'El correo electrónico no es válido.',
                    duplicateEmail: 'El correo electrónico ya esta siendo usado.',
                    maxlength: "El correo electrónico es demasiado largo"
                },
                username: {
                    required: 'El nombre de usuario no puede estar vacío.',
                    whitespaces: 'El nombre de usuario no puede estar vacío.',
                    username: 'El nombre de usuario no es válido',
                    duplicateUsername: 'El nombre de usuario ya esta siendo usado.'
                },
                password: {
                    required: 'La contraseña no puede estar vacía.',
                    whitespaces: 'La contraseña no puede estar vacía.',
                    passwordRequirements: 'La contraseña no es válida.',
                    maxlength: "La contraseña es demasiado larga"
                },
                "confirm-password": {
                    required: 'Confirmar contraseña no puede estar vacío.',
                    whitespaces: 'Confirmar contraseña no puede estar vacío.',
                    passwordForm: 'Confirmar contraseña no coincide con contraseña.'
                }
            },
            errorElement: 'small',
            errorPlacement: function(error, element) {
                error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
            }
        });

    }

}