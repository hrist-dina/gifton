import $ from "jquery";
import Swiper from "swiper";


export class SwiperBase {
    constructor(selector, options) {
        this.selector = selector;
        this.screenWidht = 768;
        this.options = options;

        this.init();
    }

    init() {
        this.bindOptions();
        $(window).on('resize', () => {
            this.initSwiper();
        }).resize();
    }

    bindOptions(...options) {
        let defaultOptions = {
            slidesPerView: "auto",
        };
        this.options = $.extend(defaultOptions, options);
    }

    initSwiper() {
        let mySwiper = undefined;

        let screenWidth = $(window).width();
        if (screenWidth <= this.screenWidht && mySwiper == undefined) {
            mySwiper = new Swiper(this.selector, this.options);
        } else if (screenWidth > this.screenWidht && mySwiper != undefined) {
            mySwiper.destroy();
            mySwiper = undefined;
            $(this.selector).removeAttr("style");
            $(".swiper-slide").removeAttr("style");
        }
    }
}