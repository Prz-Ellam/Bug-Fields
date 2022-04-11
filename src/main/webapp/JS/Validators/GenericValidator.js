export default class GenericView {

    static validateInput(input, state) {
        
        if (state) {
            $(input).addClass("is-valid").removeClass("is-invalid");
        }
        else {
            $(input).addClass("is-invalid").removeClass("is-valid");
        }

    }

    static focusInput(input) {

        $(input).removeClass("is-invalid").removeClass("is-valid");
        $(`#${input.name}-error-label`).remove();

    }

}