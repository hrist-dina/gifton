import $ from "jquery";
import {FormatPrice} from "../../../js/classes/FormatPrice";

export class SelectQuantity {
    constructor(select = '.js-quantity') {
        this.parent = `${select}-parent`;
        this.minus = `${select}-minus`;
        this.plus = `${select}-plus`;
        this.input = `${select}-input`;
        this.sumSelector = `${select}-sum`;
        this.totalSumSelector = `${select}-total-sum`;
        this.productId = 'product-id';

        this.init();
    }

    static ruble(value) {
        return new FormatPrice(value).ruble();
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
        if (!input.is("input")) {
            input = $(elem).siblings(this.input);
        }

        let number = input.val().replace(/[^\d]/, "");
        if (number === "") {
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
        input.trigger('change');
        this.sum(input, this.price(input), newVal);
        this.total(input);
        // TODO:: тут можно добавить ajax для отправки значений на сервер (известен id продукта и количество)
    }

    product(input) {
        return $(document).find(`#${$(input).data(this.productId)}`);
    }

    price(input) {
        return this.product(input).data('price');
    }

    sum(input, price, count) {
        let sum = price * count;
        this.product(input).find(this.sumSelector).text(this.constructor.ruble(sum));
        return sum;
    }

    total(currentInput) {
        let inputList = $(this.product(currentInput)).siblings().find(this.input);

        let total = this.sum(currentInput, this.price(currentInput), currentInput.val());
        inputList.map((key, item) => {
            let input = $(item);
            total += this.sum(input, this.price(input), input.val());
        });

        $(currentInput)
            .parents(this.parent)
            .find(this.totalSumSelector)
            .html(this.constructor.ruble(total));

    }
}