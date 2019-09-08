import {SwiperBase} from "../../../js/classes/SwiperBase";

export class SwiperBrief extends SwiperBase {

    init() {
        this.screenWidht = 992;
        super.init();
    }

    bindOptions() {
        super.bindOptions( {
            centeredSlides: true,
        });
    }
}
