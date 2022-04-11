export default class CreatePostValidator {

    constructor(formID) {

        $.validator.addMethod('whitespaces', function(value, element, parameter) {
            return this.optional(element) || !/^\s*$/.test(value);
        }, 'El correo electrónico no puede estar vacío');
    
        $.validator.addMethod('alphas', function(value, element, parameter) {
            return this.optional(element) || /^[a-zA-Z \u00C0-\u00FF]+$/.test(value);
        }, 'invalido');

        $(formID).validate({
            rules: {
                title: {
                    required: true,
                    whitespaces: true,
                    alphas: true
                },
                description: {
                    required: true,
                    whitespaces: true
                }
            },
            messages: {
                title: {
                    required: "El título no puede estar vacío.",
                    whitespaces: "El título no puede estar vacío.",
                    alphas: "El título no es válido."
                },
                description: {
                    required: "La descripción no puede estar vacía.",
                    whitespaces: "La descripción no puede estar vacía."
                }
            },
            errorElement: 'small',
            errorPlacement: function(error, element) {
                error.insertAfter(element).addClass('text-danger').addClass('invalid-feedback').attr('id', element[0].id + '-error-label');
            }
        });

    }

}