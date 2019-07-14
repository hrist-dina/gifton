import $ from "jquery";

export class SelectQuantity {
    constructor() {
        this.minus = ".js-quantity-minus";
        this.plus = ".js-quantity-plus";
        this.input = ".js-quantity-input";

        this.init();
    }

    init() {
        this.onMinus();
        this.onPlus();
        this.onChange();
    }

    onPlus() {
        const self = this;
        $(document).on("click", this.plus, function () {
            self.count(this, "plus");
        });
    }

    onMinus() {
        const self = this;
        $(document).on("click", this.minus, function () {
            self.count(this, "minus");
        });
    }

    onChange() {
        const self = this;
        $(document).on("input", this.input, function () {
            self.count(this);
        });
    }

    count(elem, type) {
        let input = $(elem);
        if (!input.is('input')) {
            input = $(elem).siblings(this.input);
        }

        let number = input.val().replace(/[^\d]/, "");
        if (number === '') {
            number = 1;
        }
        number = parseInt(number);

        let newVal = number;
        if (type === "plus") {
            newVal = number + 1;
        } else if (type === "minus") {
            newVal = number - 1;
        }
        if (newVal < 1) {
            newVal = 1;
        }
        const max = input.data("quantity-max");
        if (newVal > max) {
            newVal = max;
        }
        input.val(newVal);
    }
}