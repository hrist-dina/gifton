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
            if(event.type=="mouseover" || event.type=="mouseenter") {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
            
            new BaronScroll({
                root: self.scrollSelector
            });
        });
    }
}
