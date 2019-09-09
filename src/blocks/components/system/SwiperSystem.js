import {SwiperBase} from "../../../js/classes/SwiperBase";

export class SwiperSystem extends SwiperBase {

    bindOptions() {
        this.screenWidht = 1200;
        super.bindOptions( {
            breakpoints: {
                1200: {
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: "auto",
                },
            }
        });
    }
}
