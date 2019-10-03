import $ from "jquery";

export class CatalogFilter {
    constructor(
        selector = ".js-catalog-filter",
        dropdown = ".js-dropdown"
    ) {
        this.filter = $(selector);

        this.dropdown = dropdown;
        this.dropdownList = $(dropdown);

        this.open = $(`${selector}-open`);
        this.close = $(`${selector}-close`);

        this.init();
    }

    init() {
        this.onClickDropdown();
        this.openMobile();
        this.closeMobile();
    }

    onClickDropdown() {
        const self = this;
        this.dropdownList.find(`${this.dropdown}-name`).on("click", function () {
            $(this).siblings(`${self.dropdown}-block`).slideToggle();
            $(this).parents(self.dropdown).toggleClass("active");
        });
    }

    openMobile() {
        this.open.on('click', () => {
            this.filter.addClass('active');
            $('body').addClass('o-hidden');
        });
    }

    closeMobile() {
        this.close.on('click', (event) => {
            event.preventDefault();
            this.filter.removeClass('active');
            $('body').removeClass('o-hidden');
        });
    }
}

$(document).ready(function () {

    $('[name="catalog-sort"]').on('change', function() {
        $(this).closest('form').submit();
    });
});