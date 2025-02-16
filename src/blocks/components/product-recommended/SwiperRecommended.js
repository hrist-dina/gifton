import {SwiperBase} from "../../../js/classes/SwiperBase";

export class SwiperRecommended extends SwiperBase {

    bindOptions() {
        this.screenWidht = 1200;
        super.bindOptions( {
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 'auto',
                },
            }
        });
    }
}
