import {SwiperBase} from "../../../js/classes/SwiperBase";

export class SwiperRecommended extends SwiperBase {

    bindOptions(...options) {
        super.bindOptions(...options, {
            breakpoints: {
                1200: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
                640: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 1,
                }
            }
        });
    }
}
