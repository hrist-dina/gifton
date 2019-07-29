import wNumb from "wnumb";

export class FormatPrice {
    constructor(value) {
        this.value = value;
    }

    ruble() {
        let moneyFormat = wNumb({
            decimals: 0,
            thousand: " ",
            suffix: " ₽"
        });

        return moneyFormat.to(this.value);
    }
}