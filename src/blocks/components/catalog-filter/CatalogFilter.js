import $ from "jquery";

export class CatalogFilter {
    constructor(selector = ".js-catalog-filter", dropdown = ".js-dropdown") {
        this.filter = $(selector);

        this.dropdown = dropdown;
        this.dropdownList = $(dropdown);

        this.init();
    }

    init() {
        this.onClickDropdown();
    }

    onClickDropdown() {
        const self = this;
        this.dropdownList.find(`${this.dropdown}-name`).on("click", function () {
            $(this).siblings(`${self.dropdown}-block`).slideToggle();
            $(this).parents(self.dropdown).toggleClass("active");
        });
    }
}