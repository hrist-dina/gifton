import $ from "jquery";
import Inputmask from "inputmask";

export class InputMask {
    constructor(selector = '.js-input-mask') {
        this.selector = $(selector);
    }

    phone() {
        console.log('test');
        let im = new Inputmask('+7(999)999-99-99');
        console.log(im);
        im.mask(this.selector);
    }
}