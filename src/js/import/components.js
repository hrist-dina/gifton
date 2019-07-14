import $ from "jquery";
import {CatalogFilter} from "%components%/catalog-filter/CatalogFilter";
import {PriceSlider} from "%components%/price-slider/PriceSlider";
import {Select} from "%components%/select/Select";
import {SelectQuantity} from "%components%/select-quantity/SelectQuantity";

$(document).ready(function () {
    new CatalogFilter();
    new PriceSlider();
    new Select();
    new Select('.js-select-no-border', 'gifton-no-border', {
        width: '100%',
        dropdownAutoWidth : true
    });
    new SelectQuantity();
});