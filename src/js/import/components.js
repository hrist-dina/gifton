import $ from "jquery";
import {CatalogFilter} from "%components%/catalog-filter/CatalogFilter";
import {PriceSlider} from "%components%/price-slider/PriceSlider";
import {Select} from "%components%/select/Select";
import {SelectQuantity} from "%components%/select-quantity/SelectQuantity";
import {ProductDetail} from "%components%/product-detail/ProductDetail";
import {Search} from "%components%/search/Search";
import {BaronScroll} from "../classes/BaronScroll";
import {HeaderBasket} from "%components%/header-basket/HeaderBasket";
import {ChangeViewMode} from "%components%/catalog-view-mode/ChangeViewMode";
import {CatalogAccordion} from "%components%/catalog-accordion/CatalogAccordion";
import Slider from "../classes/Slider";
import {SliderMain} from "%components%/slider-main/SliderMain";
import {Map} from "%components%/map/Map";
import {ContactMap} from "%components%/contacts/ContactMap";
import {Brief} from "%components%/brief/Brief";

$(document).ready(function () {
    new CatalogFilter();
    new CatalogAccordion();
    new PriceSlider();
    new PriceSlider('.js-days-slider', {
        titles: ['день', 'дня', 'дней']
    });
    new PriceSlider('.js-count-slider', {
        suffix: 'шт'
    });
    new Select();
    new Select('.js-select-no-border', 'gifton-no-border', {
        width: '100%',
        dropdownAutoWidth : true
    });
    new SelectQuantity();
    new ProductDetail();
    new Search();
    new BaronScroll({
        root: '.js-scroll'
    });
    new HeaderBasket();
    new ChangeViewMode();
    new Slider();
    new SliderMain('.js-slider-main');
    new Map();
    new ContactMap('contact-map');
    new Brief();
    new SliderAbout('.js-slider-about');
});