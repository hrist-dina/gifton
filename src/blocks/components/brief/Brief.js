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
            
            
            if($('[name=price]:checked').length==0 && $('[name=price_all]:checked').length==0)
                return false;

            if($(event.target).is('.js-brief-all-price'))
                return false;

            
            
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
            e.preventDefault();
            var breifForm = $(this);
            $(briefForm).find('p.mess').remove();
            if (!briefForm.init()) {
                BX.showWait();                
                $.get("/local/script/ajax.php", $(this).serialize(),
                    function(data) {
                        data=$.parseJSON(data);
                        $('[data-brief-step="3"]').find('.brief-settings').append('<p class="mess">Мы получили вашу заявку и скоро свяжемся с Вами</p>');
                        BX.closeWait();                        
                        $(breifForm).find('[type=text], textarea').val('');
                    }
                );
            }
        });
    }

    initSwiper() {
        new SwiperBrief('.js-slider-brief');
    }
}

$(document).ready(function () {

    function getPrice() {
        $('[name=price_all]').prop('checked', false);
        console.log($(price).closest('.brief-card').find('.brief-card__title').text());
        $('[data-brief-step="3"]').find('p.mess').remove();
        let price = $('.brief-card').find('[name=price]:checked');
        $(price).closest('.btn').addClass('active').find('span').text('Выбрано').closest('.brief-card').addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active').find('.btn').removeClass('active').find('span').text('Выбрать');
        $('[data-brief-step="2"], [data-brief-step="3"]').find('.status-bar__item:eq(0)').find('.status-bar__icon').attr('class', 'status-bar__icon '+$(price).val()).attr('title', $(price).closest('.brief-card').find('.brief-card__title').text()).parent().find('ul').html('<li>'+$(price).closest('.brief-card').find('.brief-card__title').text()+'</li>');
        $('[data-brief-step="2"]').find('.brief-card:eq(0)').attr('class', 'brief-card selected '+$(price).val());
        $('[data-brief-step="2"]').find('.brief-card__title:eq(0)').text($(price).closest('.brief-card').find('.brief-card__title').text());         
    }
    $('.brief-card').on('click', function() {
        getPrice();
    });
    getPrice();   

    function getOptions() {
        $('[data-brief-step="3"]').find('p.mess').remove();
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
        $('[data-brief-step="3"]').find('p.mess').remove();
        let text = '';
        text = $('[data-brief-step="2"]').find(':checked').closest('label').find('.switch-title b').text()+'<br>';
        text = text+$('[data-brief-step="2"]').find('.catalog-filter__list [name=min]').val().replace(/\D+/g,"")+' - ';
        text = text+$('[data-brief-step="2"]').find('.catalog-filter__list [name=max]').val().replace(/\D+/g,"")+' шт.';
        $('[data-brief-step="3"]').find('.status-bar__item:eq(1)').find('.status-bar__text').html(text);
    }
    $('[data-brief-step="2"] [name=srok], [data-brief-step="2"] [name=min], [data-brief-step="2"] [name=max]').on('change', function() {
        getSroki();
        if($(this).is('[name=srok]')) {
            $(document).find('[name=srok_copy][value='+$(this).val()+']').prop('checked', true);
        }
    });  
    getSroki();

    $('a.brief__btn-step').on('click', function() {
        if($('[name=price]:checked').length>0 || $('[name=price_all]:checked').length>0) {
            $(this).closest('.js-brief-step').find('.status-bar__item.active').nextUntil('.status-bar__item').next().trigger('click');
        }
    });

    $('.brief__btn-back').on('click', function() {
        $(this).closest('.js-brief-step').find('.status-bar__item.active').prevUntil('.status-bar__item').prev().trigger('click');
    });

    $('.js-brief-all-price').on('click', function() {
        $('[name=price_all]').prop('checked', true);
        $('[name=price]').prop('checked', true);
        $('[data-brief-step="3"]').find('p.mess').remove();
        $('[data-brief-step="1"] .brief-card .btn').addClass('active').find('span').text('Выбрано').closest('.brief-card').addClass('swiper-slide-active');
        $('[data-brief-step="2"], [data-brief-step="3"]').find('.status-bar__item:eq(0)').find('.status-bar__icon').attr('class', 'status-bar__icon vip').attr('title', 'Все выбрано');
        $('[data-brief-step="2"]').find('.brief-card:eq(0)').attr('class', 'brief-card selected vip');
        $('[data-brief-step="2"]').find('.brief-card__title:eq(0)').text('Все выбрано');  
        $('[data-brief-step="2"], [data-brief-step="3"]').find('.status-bar__text:eq(0) ul').html('<li>Все выбрано</li>');
        $(document).find('[data-brief-step]').addClass('hide');  
        $(document).find('[data-brief-step=3]').removeClass('hide');  
        
    });

});