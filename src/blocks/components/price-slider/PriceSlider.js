import $ from "jquery";
import noUiSlider from "nouislider";
import wNumb from "wnumb";

export class PriceSlider {
    constructor(selector = ".js-price-slider") {
        this.priceSlider = $(selector).get(0);
        this.priceMin = $(`${selector}-min`);
        this.priceMax = $(`${selector}-max`);
        this.step = $(this.priceSlider).data("step");

        this.init();
    }

    init() {
        if (!this.priceSlider) {
            return;
        }
        this.create();
        this.update();
        this.onChange();
    }

    create() {
        noUiSlider.create(this.priceSlider, {
            start: [this.priceMin.val(), this.priceMax.val()],
            step: this.step ? this.step : 10,
            behaviour: "drag",
            connect: true,
            range: {
                "min": this.priceMin.data("price-min"),
                "max": this.priceMax.data("price-max")
            },
            format: wNumb({
                decimals: 0,
                thousand: " ",
                suffix: " ₽"
            })
        });
    }

    update() {
        let inputs = [this.priceMin, this.priceMax];
        this.priceSlider.noUiSlider.on("update", function (values, handle) {
            inputs[handle].val(values[handle]);
        });
    }

    onChange() {
        const self = this;
        this.priceMin.on("change", function () {
            self.priceSlider.noUiSlider.set([this.value, null]);
        });
        this.priceMax.on("change", function () {
            self.priceSlider.noUiSlider.set([null, this.value]);
        });
    }
}