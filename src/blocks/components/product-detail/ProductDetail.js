import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import slick from "slick-carousel";

export class ProductDetail {
    constructor() {
        this.sliderMain = ".js-product-slider-main";
        this.sliderNav = ".js-product-slider-nav";

        this.init();
    }

    init() {
        this.initSlider();
    }

    initSlider() {
        $(this.sliderMain).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: this.sliderNav
        });
        $(this.sliderNav).slick({
            nextArrow: "<div class=\"slider-round-button next\"></div>",
            prevArrow: "<div class=\"slider-round-button prev\"></div>",
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: this.sliderMain,
            arrows: true,
            dots: false,
            variableWidth: true,
            focusOnSelect: true,
            rows: 0
        });
    }
}