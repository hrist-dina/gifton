import $ from "jquery";

export class Search {
    constructor(selector = ".js-search") {
        this.selector = $(selector);
        this.seletorActivate = $(`${selector}-activate`);
        this.seletorClose = $(`${selector}-close`);

        this.init();
    }

    init() {
        this.onFocus();
    }

    onFocus() {
        this.selector.find('input').on('focus', () => {
            this.seletorActivate.addClass('active');
        });

        this.selector.find('button').on('click', (event) => {
            if (!this.seletorActivate.hasClass('active')) {
                event.preventDefault();
                this.seletorActivate.addClass('active');
            }
        });

        this.seletorClose.on('click', () => {
            this.seletorActivate.removeClass('active');
        });
    }
}