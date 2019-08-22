import $ from "jquery";

export class Brief {
    constructor(selector = '.js-brief') {
        this.brief = $(selector);

        this.step = `${selector}-step`;
        this.status = `${selector}-status`;

        this.init();
    }

    init() {
        this.onClick();
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
}