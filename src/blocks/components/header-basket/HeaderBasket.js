import $ from "jquery";
import {BaronScroll} from "../../../js/classes/BaronScroll";

export class HeaderBasket {
    constructor(selector = '.js-header-basket') {
        this.selector = $(selector);
        this.active = $(`${selector}-active`);
        this.scrollSelector = `${selector}-scroll`;

        this.init();
    }

    init() {
        this.onClick();
    }

    onClick() {
        let self = this;
        this.active.find('> a').on('click', function (event) {
            if (event.target !== this) {
                return;
            }
            if ($(window).width() > 768) {
                event.preventDefault();
            }
            self.active.toggleClass('active');
            new BaronScroll({
                root: self.scrollSelector
            });
        });
    }
}