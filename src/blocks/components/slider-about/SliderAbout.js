import $ from "jquery";
import Slider from "../../../js/classes/Slider";

class SliderAbout extends Slider {
    bindOptions(...options) {
        super.bindOptions(...options, {
            nextArrow: "<div class=\"slider-round-button next\"></div>",
            prevArrow: "<div class=\"slider-round-button prev\"></div>",
        });
    }

}

export {SliderAbout};