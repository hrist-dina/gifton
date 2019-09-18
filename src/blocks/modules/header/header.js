import $ from "jquery";

export class HeaderMobileMenu {
    constructor(selector = '.js-mobile-menu') {
        this.menu = $(selector);
        this.menuHeader= $(`${selector}-header`);
        this.openMenu = $(`${selector}-open`);

        this.init();
    }

    init() {
        this.onClick();
    }

    onClick() {
        const self = this;
        this.openMenu.on('click', function () {
            $(this).toggleClass('is-active');
            self.menu.toggleClass('active');
            self.menuHeader.toggleClass('active');
            $('html').toggleClass('o-hidden');
        });
    }
}

$(document).ready(function () {
    new HeaderMobileMenu();
});