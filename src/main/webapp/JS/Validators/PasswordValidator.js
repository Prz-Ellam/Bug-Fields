import GenericValidator from "./GenericValidator.js";

export default class PasswordValidator extends GenericValidator {

    constructor(formID) {

        super(formID);
        this.formID = formID;

        $.validator.addMethod('passwordRequirements', function(value, element, parameter) {
            let upper = this.optional(element) || /([A-Z])/.test(value);
            let lower = this.optional(element) || /([a-z])/.test(value);
            let number = this.optional(element) || /([0-9])/.test(value);
            let symbol = this.optional(element) || /[.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…]/.test(value);
            let length = this.optional(element) || value.length > 7;
           
            return upper && lower && number && symbol && length;
        }, 'invalido');

        $.validator.addMethod('passwordForm', function(value, element, parameter) {
            return this.optional(element) || $('#new-password').val() == value;
        }, 'invalido');

        $(formID).validate({
            rules: {
                "old-password": {
                    required: true,
                    whitespaces: true,
                    maxlength: 50
                },
                "new-password": {
                    required: true,
                    whitespaces: true,
                    passwordRequirements: true,
                    maxlength: 50
                },
                "confirm-new-password": {
                    required: true,
                    whitespaces: true,
                    passwordForm: true
                }
            },
            messages: {
                "old-password": {
                    required: 'La contraseña no puede estar vacía.',
                    whitespaces: 'La contraseña no puede estar vacía.',
                    maxlength: "La contraseña es demasiado larga."
                },
                "new-password": {
                    required: 'La nueva contraseña no puede estar vacía.',
                    whitespaces: 'La nueva contraseña no puede estar vacía.',
                    passwordRequirements: 'La nueva contraseña no es válida.',
                    maxlength: "La nueva contraseña es demasiado larga."
                },
                "confirm-new-password": {
                    required: 'Confirmar nueva contraseña no puede estar vacío.',
                    whitespaces: 'Confirmar nueva contraseña no puede estar vacío.',
                    passwordForm: 'Confirmar nueva contraseña no coincide con contraseña.'
                }
            },
            errorElement: 'small',
            errorPlacement: function(error, element) {
                error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
            }
        });

    }

}