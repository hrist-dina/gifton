import $ from "jquery";
import {BaronScroll} from "../../../js/classes/BaronScroll";

export class HeaderMobileMenu {
    constructor(selector = '.js-mobile-menu') {
        this.menu = $(selector);
        this.menuHeader= $(`${selector}-header`);
        this.openMenu = $(`${selector}-open`);

        this.init();
    }

    init() {
        this.onClick();
    }

    onClick() {
        const self = this;
        this.openMenu.on('click', function () {
            $(this).toggleClass('is-active');
            self.menu.toggleClass('active');
            self.menuHeader.toggleClass('active');
            $('html').toggleClass('o-hidden');
        });
    }
}

$(document).ready(function () {
    new HeaderMobileMenu();
});

$(document).ready(function () {
    //обновление корзины в шапке
    function refreshCart() {
        $('[data-basket-count]').find('.header-basket__link').siblings().remove();        
        $('.header-basket__link').hide();
        $.ajax({
            type: "POST",
            data: {label: 'listProd'},
            url: '/local/script/ajax.php',
            success: function(data) {
                data=$.parseJSON(data);
                let sum = data.sum;
                let minSum = data.minSum;
                data = data.prods;
                $('[data-basket-count]').attr('data-basket-count', data.length);
                if(data.length>0) {
                    let list = '';
                    for (var i = 0; i < data.length ; i++) {
                        list = list + '<div class="header-basket__product" id="header-basket-product-'+i+'" data-price="'+data[i].price+'" data-quantity="'+data[i].qty+'">\
                            <div class="header-basket__product-img"><img src="'+data[i].pic+'"></div>\
                            <div class="header-basket__product-center">\
                                <a class="header-basket__product-name" href="'+data[i].detail+'">'+data[i].name+'</a>\
                                <div class="header-basket__product-price">'+data[i].price_pr+' ₽</div>\
                            </div>\
                            <div class="header-basket__product-quantity">\
                                <div class="select-quantity-mini">\
                                    <div class="select-quantity-mini__inner">\
                                        <span class="select-quantity-mini__minus js-quantity-minus">-</span>\
                                        <input class="js-quantity-input" type="text" value="'+data[i].qty+'" data-add-prod="'+data[i].id+'" data-product-id="header-basket-product-'+i+'" data-quantity-max="'+data[i].max+'">\
                                        <span class="select-quantity-mini__plus js-quantity-plus">+</span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="header-basket__product-sum js-quantity-sum">'+data[i].price_all_pr+' ₽</div>\
                            <div class="header-basket__product-remove">\
                                <div class="btn-remove js-header-basket-remove" data-del-prod="'+data[i].id+'"></div>\
                            </div>\
                        </div>';
                    }
                    $('[data-basket-count]').removeClass('is-empty').find('.header-basket__link').after('<div class="header-basket__product-wrap js-quantity-parent">\
                            <div class="header-basket__product-inner"><div class="header-basket__product-list js-header-basket-scroll">'+list+'</div></div>\
                            <div class="header-basket__bottom">\
                                <div class="header-basket__attention">'+minSum+' ₽ - Минимальная сумма заказа!</div>\
                                <div class="header-basket__total-sum js-quantity-total-sum">'+sum+' ₽</div>\
                            </div>\
                    </div>');
                } else {
                    $('[data-basket-count]').addClass('is-empty');
                }      
                $('.header-basket__link').show();          
            }
        });
    }
    refreshCart();

    //изменение кол-ва в малой корзине
    $(document).on('change', '[data-add-prod]', function() {
        $.ajax({
            type: "POST",
            data: {qty: $(this).val(), label: 'plusProd', id: $(this).data('add-prod')},
            url: '/local/script/ajax.php',
            success: function(data) {
                data=$.parseJSON(data);
                $('[data-basket-count]').find('.js-quantity-total-sum').html(data.sum+' ₽');  
            }
        });
    });

    //удаление в малой корзине
    $(document).on('click', '[data-del-prod]', function() {
        let id = $(this).data('del-prod');
        $(this).closest('.header-basket__product').remove();        
        $.ajax({
            type: "POST",
            data: {label: 'delProd', id: id},
            url: '/local/script/ajax.php',
            success: function(data) {
                data=$.parseJSON(data);
                $('[data-basket-count]').find('.js-quantity-total-sum').html(data.sum+' ₽');
                if(data.null) {
                    $('[data-basket-count]').addClass('is-empty').removeClass('active').find('.header-basket__link').siblings().remove();
                } 
            }
        });
    });

    //смена предложения в карточке товара
    function changeOfferCard() {
        let offerColor = 0;
        let offerSize = 0;
        let color = '';
        if($(document).find('[data-size-offer]').length>0) {
            offerSize = $(document).find('[data-size-offer]').val();
        }        
        if($(document).find('[data-color-change]').length>0) {
            offerColor = $(document).find('[data-color-change].active').attr('data-color-change');
            color = window.elementOffersColors[0][offerColor];
        }
        let offer = window.elementOffers[0][offerColor][offerSize];        
        $(document).find('[data-price-offer]').text(offer['PRICE']+' ₽');
        $(document).find('[data-add-offer]').attr('data-add-offer', offer['ID']);
        $(document).find('[data-qnt-offer]').attr('data-quantity-max', offer['QUANTITY']).val(1);
        $(document).find('[data-qnt-text-offer]').text(offer['QUANTITY']+' шт');
        $(document).find('[data-art-offer]').text('Арт.'+offer['ART']);
        if(color!='') {
            $('[data-color-offer]').show().find('.product-box__prop-value').text(color);
        }
        else 
            $('[data-color-offer]').hide().find('.product-box__prop-value').text('');
    }
    if($('[data-add-offer]').length>0) 
        changeOfferCard();

    //смена предложения по фотке цвета
    $('[data-color-change]').on('click', 'a', function(e) {
        e.preventDefault();
        $(this).parent('[data-color-change]').addClass('active').siblings('[data-color-change]').removeClass('active');
        refreshSize($(this).parent('[data-color-change]').attr('data-color-change'));        
    });
    function refreshSize(color) {
        if($(document).find('[data-size-offer]').length>0) {
            $(document).find('[data-size-offer] option:not([data-color-forSize="'+color+'"])').prop('selected', false).prop('disabled', true);
            $(document).find('[data-size-offer] option[data-color-forSize="'+color+'"]').prop('disabled', false);
            if($(document).find('[data-size-offer] option:selected')) {
                $(document).find('[data-size-offer] option[data-color-forSize="'+color+'"]:eq(0)').prop('selected', true);
            }
            $(document).find('[data-size-offer]').select2({
                minimumResultsForSearch: Infinity,
                theme: 'gifton',
                width: 'resolve'
            });
        }        
        changeOfferCard();
    }
    //смена размера
    $('[data-size-offer]').on('change', function() {
        changeOfferCard();
    });
    
    //добавление в корзину из карточки товара
    $('[data-add-offer]').on('click', function(e) {
        e.preventDefault();
        BX.showWait();
        $('[data-basket-count]').removeClass('active');
        $.ajax({
            type: "POST",
            data: {qty: $(document).find('[data-qnt-offer]').val(), label: 'addProd', action: 'add', id: $(this).attr('data-add-offer')},
            url: '/local/script/ajax.php',
            success: function(data) {
                refreshCart();
                BX.closeWait();                
            }
        });
    });

    //смена предложения в списке товаров
    $('[name=change-offer]').on('change', function() {
        let card = $(this).closest('.product-card');
        let num = $(card).attr('id').replace('product-', '');
        let mass = window.offers[num][0][$(this).val()];
        changeOfferList(mass, card); 
    });
    function changeOfferList(mass, card) {
        $(card).attr('data-price', mass['PRICE']);
        $(card).attr('data-quantity', mass['QUANTITY']);
        $(card).find('.product-card__blocks-price, .product-card__total-sum, .product-card__price').text(mass['PRICE_PR']+' ₽');
        $(card).find('[data-addprod]').attr('data-addprod', mass['ID']);
        $(card).find('.product-cardcard__marker').text(mass['QUANTITY']+' шт.');
        $(card).find('.product-card__img img').attr('src', mass['PIC']);
        $(card).find('.product-card__article').text(mass['ARTICLE']?'Арт.'+mass['ARTICLE']:'');
        $(card).find('.js-quantity-input').attr('data-quantity-max', mass['QUANTITY']).val(1);
    }
    //смена предложения по фотке в списке товаров
    $('[data-pic-offer]').on('click', function(e) {
        e.preventDefault();
        let card = $(this).closest('.product-card');       
        $(card).find('[name=change-offer] option').prop('selected', false);
        $(card).find('[name=change-offer] [value="'+$(this).attr('data-pic-offer')+'"]').prop('selected', true).closest('select').trigger('change').select2({
            minimumResultsForSearch: Infinity,
            theme: 'gifton',
            width: 'resolve'
        });
    });
    //добавление в корзину из списка товаров
    $('[data-addprod]').on('click', function(e) {
        e.preventDefault();
        let card = $(this).closest('.product-card');
        BX.showWait();
        $('[data-basket-count]').removeClass('active');
        $.ajax({
            type: "POST",
            data: {qty: $(card).find('.js-quantity-input').val(), label: 'addProd', action: 'add', id: $(this).data('addprod')},
            url: '/local/script/ajax.php',
            success: function(data) {
                refreshCart();
                BX.closeWait();                
            }
        });
    });


    //поиск в шапке
    var xhr;
    $('.js-search [name=q]').on('input change', function() {
        let search = $(this).val();
        if(xhr && "0" != xhr) {
            xhr.abort();
        }
        if(search.length>2) {
            $('.js-search').find('.ajax__search-result').remove();
            xhr = $.ajax({
                type: "POST",
                data: {ajax: 'Y'},
                url: '/search/?q='+search,
                success: function(data) {
                    $('.js-search').find('.ajax__search-result').remove();
                    xhr = "0";
                    data = data.slice(data.indexOf('{'));
                    data=$.parseJSON(data);
                    data = data.res;
                    if(data.length>0) {
                        let list = '';
                        for (var i = 0; i < data.length ; i++) {
                            list = list + '<div class="header-basket__product" >\
                                <div class="header-basket__product-img"><a href="'+data[i].detail+'"><img src="'+data[i].pic+'"></a></div>\
                                <div class="header-basket__product-center">\
                                    <a class="header-basket__product-name" href="'+data[i].detail+'">'+data[i].name+'</a>\
                                    <div class="header-basket__product-price">'+data[i].price+' ₽</div>\
                                    <div>'+data[i].txt+'</div>\
                                </div>\
                            </div>';
                        }
                        $('.js-search').append('<div class="ajax__search-result">'+list+'</div>');
                        new BaronScroll({
                            root:  '.ajax__search-result'
                        });
                    }
                }
            });
        }
    });
});