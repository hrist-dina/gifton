import $ from "jquery";
import {BaronScroll} from "../../../js/classes/BaronSсroll";

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
        this.active.on('click', function () {
            $(this).toggleClass('active');
            new BaronScroll({
                root: self.scrollSelector
            });
        });
    }
}