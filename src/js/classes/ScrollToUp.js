import $ from "jquery";

export class ScrollToUp {
    constructor(selector = ".js-scroll-to-up") {
        this.selector = $(selector);

        this.init();
    }

    init() {
        this.onClick();
    }

    onClick() {
        this.selector.on("click", (event) => {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }
}