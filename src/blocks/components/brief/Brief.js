import $ from "jquery";
import Validator from "../../../js/classes/Validator";

export class Brief {
    constructor(selector = '.js-brief') {
        this.brief = $(selector);

        this.step = `${selector}-step`;
        this.status = `${selector}-status`;
        this.form = `${selector}-form`;

        this.init();
    }

    init() {
        this.onClick();
        this.onSubmit();
    }

    get steps() {
        return this.brief.find(this.step);
    }

    onClick() {
        const self = this;
        $(this.status).on('click', function (event) {
            event.preventDefault();
            let status = $(this).data('brief-status');

            self.steps.each(function (i, item) {
                let step = $(item);
                if (step.data('brief-step') === status) {
                    step.removeClass('hide');
                } else {
                    step.addClass('hide');
                }
            });
        });
    }

    onSubmit() {
        let briefForm = new Validator(this.form);
        briefForm.validateAgree();
        $(this.form).on('submit', function (e) {
            if (briefForm.init()) {
                e.preventDefault();
            }
        });
    }
}