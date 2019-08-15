import $ from "jquery";

export class CatalogAccordion {
    constructor(
        selector = ".js-catalog-accordion",
    ) {
        this.accordion = $(selector);

        this.open = $(`${selector}-open`);
        this.close = $(`${selector}-close`);

        this.init();
    }

    init() {
        this.openMobile();
        this.closeMobile();
    }

    openMobile() {
        this.open.on('click', () => {
            this.accordion.addClass('active');
            $('body').addClass('o-hidden');
        });
    }

    closeMobile() {
        this.close.on('click', (event) => {
            event.preventDefault();
            this.accordion.removeClass('active');
            $('body').removeClass('o-hidden');
        });
    }
}