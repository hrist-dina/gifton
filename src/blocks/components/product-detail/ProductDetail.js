import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import slick from "slick-carousel";

export class ProductDetail {
    constructor() {
        this.sliderMain = ".js-product-slider-main";
        this.sliderNav = ".js-product-slider-nav";

        this.init();
    }

    init() {
        this.initSlider();
    }

    initSlider() {
        $(this.sliderMain).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: this.sliderNav
        });
        $(this.sliderNav).slick({
            nextArrow: "<div class=\"slider-round-button next\"></div>",
            prevArrow: "<div class=\"slider-round-button prev\"></div>",
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: this.sliderMain,
            arrows: true,
            dots: false,
            variableWidth: true,
            focusOnSelect: true,
            rows: 0,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    }
    unSlider() {
        $(this.sliderMain).slick('unslick');
        $(this.sliderNav).slick('unslick');
    }
}

$(document).ready(function () {
    window.inCart = window.inCart || [];
    let prodGallery = new ProductDetail();
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
                inCart = [];
                if(data.length>0) {
                    let list = '';
                    for (var i = 0; i < data.length ; i++) {
                        inCart.push(data[i].id);
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
                $('[data-add-offer]').removeClass('btn-white').text('В корзину');
                $('[data-addprod]').removeClass('btn-white').text('В корзину');
                for (var i = 0; i < inCart.length ; i++) {
                    $('[data-add-offer="'+inCart[i]+'"]').addClass('btn-white').text('Уже в корзине');
                    $('[data-addprod="'+inCart[i]+'"]').addClass('btn-white').text('Уже в корзине').closest('.product-card').addClass('in-basket');
                }
            }
        });
    }    

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
        $(this).closest('.product-card-basket').remove();
        $.ajax({
            type: "POST",
            data: {label: 'delProd', id: id},
            url: '/local/script/ajax.php',
            success: function(data) {
                data=$.parseJSON(data);
                $('[data-basket-count]').find('.js-quantity-total-sum').html(data.sum+' ₽');
                if(data.null) {
                    $('[data-basket-count]').addClass('is-empty').removeClass('active').find('.header-basket__link').siblings().remove();
                    document.location.reload(true);
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
        if(offer['QUANTITY']==0) {
            //
        }
            $('.product-box__actions').show();
            if(inCart.indexOf(offer['ID'])==-1) {
                $('[data-add-offer]').removeClass('btn-white').text('В корзину');
            }
            else 
                $('[data-add-offer]').addClass('btn-white').text('Уже в корзине');            
            $(document).find('[data-add-offer]').attr('data-add-offer', offer['ID']);

        $(document).find('[data-price-offer]').html(offer['PRICE']+' ₽');
        $(document).find('.product-box__title').text(offer['NAME']);
        $(document).find('[data-qnt-offer]').attr('data-quantity-max', offer['QUANTITY']).val(1);
        $(document).find('[data-qnt-text-offer]').text(offer['QUANTITY']+' шт');
        $(document).find('[data-art-offer]').text('Арт.'+offer['ART']);
        if(color!='') {
            $('[data-color-offer]').show().find('.product-box__prop-value').text(color);
        }
        else 
            $('[data-color-offer]').hide().find('.product-box__prop-value').text('');
        $.ajax({
            type: "POST",
            data: {AJAX: 'Y',SITE_ID: 's1',PRODUCT_ID: offer['ID'],PARENT_ID: window.prodId},
            url: '/bitrix/components/bitrix/catalog.element/ajax.php'
        });
        $('.product-box__title').text(offer['NAME']);
        

        prodGallery.unSlider();
        $('.js-product-slider-main, .js-product-slider-nav').html('');
        for ( var i = 0; i < offer['PICS'].length ; i++) {
            $('.js-product-slider-main').append('<a class="slide" data-fancybox="product" href="'+offer['PICS'][i][0]+'"><img src="'+offer['PICS'][i][1]+'" alt=""></a>');
            $('.js-product-slider-nav').append('<div class="slide"><img src="'+offer['PICS'][i][2]+'" alt=""></div>');
        }
        prodGallery.initSlider();
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
        if($(this).attr('data-add-offer')=='') return;
        e.preventDefault();
        BX.showWait();
        var button = $(this);
        $('[data-basket-count]').removeClass('active');
        $.ajax({
            type: "POST",
            data: {qty: $(document).find('[data-qnt-offer]').val(), label: 'addProd', action: 'add', id: $(this).attr('data-add-offer')},
            url: '/local/script/ajax.php',
            success: function(data) {
                refreshCart();
                $(button).addClass('btn-white').text('Уже в корзине');
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
        $(card).find('.product-cardcard__marker').text(mass['QUANTITY']+' шт.');
        $(card).find('.product-card__img img').attr('src', mass['PIC']);
        $(card).find('.product-card__article').text(mass['ARTICLE']?'Арт.'+mass['ARTICLE']:'');
        $(card).find('.js-quantity-input').attr('data-quantity-max', mass['QUANTITY']).val(1);

        if(inCart.indexOf(mass['ID'])==-1) {
            $(card).find('[data-addprod]').removeClass('btn-white').text('В корзину').closest('.product-card').removeClass('in-basket');
        }
        else {
            $(card).find('[data-addprod]').addClass('btn-white').text('Уже в корзине').closest('.product-card').addClass('in-basket');            
        }
        
        $(card).find('[data-addprod]').attr('data-addprod', mass['ID']);
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
        if($(this).attr('data-addprod')=='') return;
        var button = $(this);
        let card = $(this).closest('.product-card');
        BX.showWait();
        $('[data-basket-count]').removeClass('active');
        $.ajax({
            type: "POST",
            data: {qty: $(card).find('.js-quantity-input').val(), label: 'addProd', action: 'add', id: $(this).attr('data-addprod')},
            url: '/local/script/ajax.php',
            success: function(data) {
                refreshCart();
                $(button).addClass('btn-white').text('Уже в корзине').closest('.product-card').addClass('in-basket');
                BX.closeWait();                
            }
        });
    });

    refreshCart();
});