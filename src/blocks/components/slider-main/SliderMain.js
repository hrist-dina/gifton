import $ from "jquery";
import Slider from "../../../js/classes/Slider";

class SliderMain extends Slider {
    bindOptions(...options) {
        super.bindOptions(...options, {
            nextArrow: "<div class=\"slider-round-button next\"></div>",
            prevArrow: "<div class=\"slider-round-button prev\"></div>",
        });
    }

    init() {
        super.init();
        this.initWrapDots();
    }

    initWrapDots() {
        let dots = this.slider.find('.slick-dots');
        if (dots) {
            dots.wrap('<div class="slick-dots-wrap">');
        }
    }
}

export {SliderMain};