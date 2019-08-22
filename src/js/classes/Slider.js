import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import slick from "slick-carousel";

class Slider {
    constructor(selector = '.js-slider', options = {}) {
        this.slider = $(selector);
        this.options = $.extend(options, this.options);

        this.init();
    }

    bindOptions(options) {
        let defaultOptions = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            rows: 0
        };

        this.options = $.extend(defaultOptions, options);
    }

    init() {
        this.bindOptions();
        this.initSlider();
    }

    initSlider() {
        this.slider.slick(this.options);
    }


}

export default Slider;