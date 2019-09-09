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
import {SliderAbout} from "%components%/slider-about/SliderAbout";
import {ScrollToUp} from "../classes/ScrollToUp";
import {ContactForm} from "%components%/contacts/ContactForm";
import {InputMask} from "../classes/InputMask";
import {CheckoutForm} from "%components%/checkout/CheckoutForm";
import {SwiperRecommended} from "%components%/product-recommended/SwiperRecommended";
import {SwiperAnnounce} from "%components%/announce/SwiperAnnounce";
import {SwiperSystem} from "%components%/system/SwiperSystem";

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
    new SwiperRecommended('.js-slider-recommended');
    new SwiperAnnounce('.js-slider-announce');
    new SwiperSystem('.js-slider-system');
    new Map();
    new ContactMap('contact-map');
    new ContactForm();
    new Brief();
    new SliderAbout('.js-slider-about');
    new ScrollToUp();
    new InputMask().phone();
    new CheckoutForm();
});