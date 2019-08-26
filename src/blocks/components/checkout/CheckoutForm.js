import $ from "jquery";
import Validator from "../../../js/classes/Validator";

export class CheckoutForm {
    constructor(selector = '.js-checkout-form') {
        this.form = selector;

        this.init();
    }

    init() {
        this.onSubmit();
    }

    onSubmit() {
        let contactForm = new Validator(this.form);
        contactForm.validateAgree();
        $(this.form).on('submit', function (e) {
            if (contactForm.init()) {
                e.preventDefault();
            }
        });
    }
}