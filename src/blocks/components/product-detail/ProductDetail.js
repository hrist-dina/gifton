import $ from "jquery";
import slick from "slick-carousel";

export class ProductDetail {
    constructor() {
        this.sliderMain = '.js-product-slider-main';
        this.sliderNav = '.js-product-slider-nav';

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
        });
        $(this.sliderNav).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: this.sliderMain,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            rows: 0
        });
    }


}
