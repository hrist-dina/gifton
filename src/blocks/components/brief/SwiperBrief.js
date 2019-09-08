import {SwiperBase} from "../../../js/classes/SwiperBase";

export class SwiperBrief extends SwiperBase {

    init() {
        this.screenWidht = 992;
        super.init();
    }

    bindOptions(...options) {
        super.bindOptions( {
            centeredSlides: true,
            // breakpoints: {
            //     992: {
            //         slidesPerView: 3,
            //     },
                // 768: {
                //     slidesPerView: 3,
                // },
                // 640: {
                //     slidesPerView: 2,
                // },
                // 480: {
                //     slidesPerView: 1,
                // }
            //}
        });
        console.log(this.options);
    }
}
