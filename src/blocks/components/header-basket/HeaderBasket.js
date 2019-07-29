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
        this.active.on('click', function (e) {
            if (e.target !== this) {
                return;
            }
            $(this).toggleClass('active');
            new BaronScroll({
                root: self.scrollSelector
            });
        });
    }
}