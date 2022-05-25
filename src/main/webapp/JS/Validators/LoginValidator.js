import GenericValidator from "./GenericValidator.js";

export default class LoginValidator extends GenericValidator {

    constructor(formID) {

        super(formID);
        this.formID = formID;

        $.validator.addMethod('whitespaces', function(value, element, parameter) {
            return this.optional(element) || !/^\s*$/.test(value);
        }, 'No puede estar vacío');

        $(formID).validate({
            rules: {
                username: {
                    required: true,
                    whitespaces: true,
                    maxlength: 20
                },
                password: {
                    required: true,
                    whitespaces: true,
                    maxlength: 50
                }
            },
            messages: {
                username: {
                    required: 'El nombre de usuario no puede estar vacío.',
                    whitespaces: 'El nombre de usuario no puede estar vacío',
                    maxlength: 'El nombre de usuario es demasiado largo'
                },
                password: {
                    required: 'La contraseña no puede estar vacía.',
                    whitespaces: 'La contraseña no puede estar vacía.',
                    maxlength: 'La contraseña es demasiado larga'
                }
            },
            errorElement: 'small',
            errorPlacement: function(error, element) {
                error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
            }
        });

    }

}