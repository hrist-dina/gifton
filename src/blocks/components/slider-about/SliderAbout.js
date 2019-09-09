import $ from "jquery";
import Slider from "../../../js/classes/Slider";

class SliderAbout extends Slider {
    bindOptions(...options) {
        super.bindOptions(...options, {
            nextArrow: "<div class=\"slider-round-button next\"></div>",
            prevArrow: "<div class=\"slider-round-button prev\"></div>",
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 786,
                    settings: {
                        slidesToShow: 2,
                        centerMode: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                    }
                }
            ]
        });
    }

}

export {SliderAbout};