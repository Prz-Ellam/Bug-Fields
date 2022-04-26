import GenericValidator from "./GenericValidator.js";

export default class ModifyPostValidator extends GenericValidator {

    constructor(formID) {

        super(formID);
        this.formID = formID;

        $.validator.addMethod('whitespaces', function(value, element, parameter) {
            return this.optional(element) || !/^\s*$/.test(value);
        }, 'invalido');
    
        $.validator.addMethod('alphanumeric', function(value, element, parameter) {
            return this.optional(element) || /^[a-zA-Z0-9.,\/#!¡¿?$%\^&\*;:{}=\-_`~()”“"…@ \u00C0-\u00FF]+$/.test(value);
        }, 'invalido');

        $(formID).validate({
            rules: {
                title: {
                    required: true,
                    whitespaces: true,
                    alphanumeric: true,
                    maxlength: 100
                },
                description: {
                    required: true,
                    whitespaces: true,
                    maxlength: 500
                }
            },
            messages: {
                title: {
                    required: "El título no puede estar vacío.",
                    whitespaces: "El título no puede estar vacío.",
                    alphanumeric: "El título no es válido.",
                    maxlength: "El título es demasiado largo."
                },
                description: {
                    required: "La descripción no puede estar vacía.",
                    whitespaces: "La descripción no puede estar vacía.",
                    maxlength: "La descripción es demasiado larga."
                }
            },
            errorElement: 'small',
            errorPlacement: function(error, element) {
                error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
            }
        });

    }

  

}