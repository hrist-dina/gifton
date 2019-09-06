import {SwiperBase} from "../../../js/classes/SwiperBase";

export class SwiperBrief extends SwiperBase {

    init() {
        this.screenWidht = 992;
        super.init();
    }

    bindOptions(...options) {
        super.bindOptions(...options, {
            breakpoints: {
                992: {
                    slidesPerView: 1,
                },
                // 768: {
                //     slidesPerView: 3,
                // },
                // 640: {
                //     slidesPerView: 2,
                // },
                // 480: {
                //     slidesPerView: 1,
                // }
            }
        });
    }
}
