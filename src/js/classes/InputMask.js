import $ from "jquery";
import Inputmask from "inputmask";

export class InputMask {
    constructor(selector = '.js-input-mask') {
        this.selector = $(selector);
    }

    phone() {
        let im = new Inputmask('+7(999)999-99-99');
        im.mask(this.selector);
    }
}