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
        this.hover();
    }

    hover() {
        let self = this;
        this.active.hover(function (event) {
            if ($(window).width() > 768) {
                event.preventDefault();
            }
            $(this).toggleClass('active');
            new BaronScroll({
                root: self.scrollSelector
            });
        });
    }
}
