import $ from "jquery";
import fancybox from "@fancyapps/fancybox";

export class FancyBox {
    constructor(selector = ".js-fancybox") {
        this.selector = $(selector);

        this.init();
    }

    init() {
        this.bind();
    }

    bind() {
        this.selector.fancybox();
    }
}