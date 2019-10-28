import $ from "jquery";
import noUiSlider from "nouislider";
import wNumb from "wnumb";

export class PriceSlider {
    constructor(selector = ".js-price-slider", options = {}) {
        this.selector = selector;
        this.priceSlider = $(this.selector).get(0);
        this.priceMin = $(`${this.selector}-min`);
        this.priceMax = $(`${this.selector}-max`);
        this.step = $(this.priceSlider).data("step");
        this.suffix = options.suffix ? options.suffix : "₽";
        this.titles = options.titles ? options.titles : [];

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
                "min": this.priceMin.data('min'),
                "max": this.priceMax.data('max')
            },
            format: wNumb({
                decimals: 0,
                thousand: " ",
            })
        });
    }

    update() {
        let inputs = [this.priceMin, this.priceMax];
        let self = this;
        this.priceSlider.noUiSlider.on("update", function (values, handle) {
            inputs[handle].val(self.getValue(values[handle]));
        }); 
        this.priceSlider.noUiSlider.on("end", function (values, handle) {
            $('[data-brief-step="2"] [name=min]').trigger("change");
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

    getValue(number) {
        return `${number} ${this.getSuffix(number)}`;
    }

    getSuffix(number) {
        if (this.titles.length) {
            return this.declOfNum(number);
        }
        return this.suffix;
    }

    declOfNum(number) {
        let n = parseInt(number);
        return this.titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    }
}