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