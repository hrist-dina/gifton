import $ from "jquery";
import {CatalogFilter} from "%components%/catalog-filter/CatalogFilter";
import {PriceSlider} from "%components%/price-slider/PriceSlider";
import {Select} from "%components%/select/Select";
import {SelectQuantity} from "%components%/select-quantity/SelectQuantity";
import {ProductDetail} from "%components%/product-detail/ProductDetail";
import {Search} from "%components%/search/Search";

$(document).ready(function () {
    new CatalogFilter();
    new PriceSlider();
    new Select();
    new Select('.js-select-no-border', 'gifton-no-border', {
        width: '100%',
        dropdownAutoWidth : true
    });
    new SelectQuantity();
    new ProductDetail();
    new Search();
});