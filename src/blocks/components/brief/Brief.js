import $ from "jquery";
import Validator from "../../../js/classes/Validator";
import {SwiperBrief} from "%components%/brief/SwiperBrief";

export class Brief {
    constructor(selector = '.js-brief') {
        this.brief = $(selector);

        this.step = `${selector}-step`;
        this.status = `${selector}-status`;
        this.form = `${selector}-form`;

        this.init();
    }

    init() {
        this.onClick();
        this.onSubmit();
        this.initSwiper();
    }

    get steps() {
        return this.brief.find(this.step);
    }

    onClick() {
        const self = this;
        $(this.status).on('click', function (event) {
            event.preventDefault();
            let status = $(this).data('brief-status');

            self.steps.each(function (i, item) {
                let step = $(item);
                if (step.data('brief-step') === status) {
                    step.removeClass('hide');
                } else {
                    step.addClass('hide');
                }
            });
        });
    }

    onSubmit() {
        let briefForm = new Validator(this.form);
        briefForm.validateAgree();
        $(this.form).on('submit', function (e) {
            if (briefForm.init()) {
                e.preventDefault();

            }
        });
    }

    initSwiper() {
        new SwiperBrief('.js-slider-brief');
    }
}

$(document).ready(function () {

    function getPrice() {
        let price = $('.brief-card').find('[name=price]:checked');
        $(price).closest('label').addClass('active').closest('.brief-card').addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active').find('label').removeClass('active');  
        $('[data-brief-step="2"], [data-brief-step="3"]').find('.status-bar__item:eq(0)').find('.status-bar__icon').attr('class', 'status-bar__icon '+$(price).val());
        $('[data-brief-step="2"]').find('.brief-card:eq(0)').attr('class', 'brief-card selected '+$(price).val());
        $('[data-brief-step="2"]').find('.brief-card__title:eq(0)').text($(price).closest('.brief-card').find('.brief-card__title').text());         
    }
    $('.brief-card label').on('click', function() {        
        getPrice();
    });
    getPrice();   

    function getOptions() {
        let lis = '';
        $('[data-brief-step="1"]').find('.brief__options').find(':checked').each(function() {
            lis = lis+'<li>+ '+$(this).closest('label').find('.switch-title').text()+'</li>';    
        });        
        $('[data-brief-step="2"], [data-brief-step="3"]').find('.status-bar__text:eq(0) ul').html(lis);
    }
    $('.brief__options input').on('change', function() {
        getOptions();
    }); 
    getOptions();

    function getSroki() {
        let text = '';
        text = $('[data-brief-step="2"]').find(':checked').closest('label').find('.switch-title b').text()+'<br>';
        text = text+$('[data-brief-step="2"]').find('.catalog-filter__list [name=min]').val().replace(/\D+/g,"")+' - ';
        text = text+$('[data-brief-step="2"]').find('.catalog-filter__list [name=max]').val().replace(/\D+/g,"")+' шт.';
        $('[data-brief-step="3"]').find('.status-bar__item:eq(1)').find('.status-bar__text').html(text);
    }
    $('[data-brief-step="2"] [name=srok], [data-brief-step="2"] [name=min], [data-brief-step="2"] [name=max]').on('change', function() {
        getSroki();
    });
    
    console.log(document.querySelector('.js-slider-brief'));
    var mySwiper = document.querySelector('.js-slider-brief');
    console.log(mySwiper);
    if(mySwiper && mySwiper.swiper) {
        mySwiper.swiper.on('slideChange', function () {
            console.log(15);
            getSroki();
        });    
    }

    $('a.brief__btn-step').on('click', function() {
        $(this).closest('.js-brief-step').find('.status-bar__item.active').nextUntil('.status-bar__item').next().trigger('click');
    });

    $('.brief__btn-back').on('click', function() {
        $(this).closest('.js-brief-step').find('.status-bar__item.active').prevUntil('.status-bar__item').prev().trigger('click');
    });

});