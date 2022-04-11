export default class GenericValidator {

    constructor(formID) {

        this.formID = formID;
        
    }

    validateInput(input) {

        if (this.getInputStatus(input)) {
            $(input).addClass("is-valid").removeClass("is-invalid");
        }
        else {
            $(input).addClass("is-invalid").removeClass("is-valid");
        }

    }

    focusInput(input) {

        $(input).removeClass("is-invalid").removeClass("is-valid");
        $(`#${input.name}-error-label`).remove();

    }

    getInputStatus(input) {

        let validator = $(this.formID).validate();
        return validator.element(input);

    }

}