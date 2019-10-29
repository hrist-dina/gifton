import $ from "jquery";
import baron from "baron";

export class BaronScroll {
    constructor(options) {
        this.options = $.extend({
            root    : '.scroller_wrap',
            barOnCls: 'baron',
            id: false
        }, options);

        this.content = 'scroller__content';
        this.scroller = 'scroller';
        this.barWrapper = 'scroller__bar-wrapper';
        this.bar = 'scroller__bar';

        this.init();
    }

    init() {
        this.initWrap();
        this.initScroll();
        setTimeout( () => {
            this.checkSize();
        }, 100);
    }

    initWrap() {
        const self = this;
        if (!self.options.id) {
            $(this.options.root).each(function () {
                if ($(this).find(`.${self.scroller}`).length) {
                    return;
                }
                $(this).css('height', $(this).height());
                $(this).wrapInner(`<div class="${self.content}"></div>`);
                $(this).wrapInner(`<div class="${self.scroller}"></div>`);
                $(this).append(`<div class="${self.barWrapper}"><div class="${self.bar}"></div></div>`);
            });
        } else {

            let id = $(document).find(`.${self.options.id}`);
            if ($(id).find(`.${self.scroller}`).length) {
                return;
            }
            $(id).css('height', id.height());
            $(id).wrapInner(`<div class="${self.content}"></div>`);
            $(id).wrapInner(`<div class="${self.scroller}"></div>`);
            $(id).append(`<div class="${self.barWrapper}"><div class="${self.bar}"></div></div>`);
        }
    }

    initScroll() {
        if (!$(this.options.root).length || $(this.options.root).hasClass(this.options.barOnCls)) {
            return;
        }
        const self = this;
        $(this.options.root).each(function (key,item) {
            let root = self.options.id ? self.options.id :  `js-baron-activate-${key}`;
            $(item).addClass(root);
            baron({
                root    : `.${root}`,
                scroller: `.${self.scroller}`,
                bar     : `.${self.bar}`,
                barOnCls: self.options.barOnCls
            });
        });
        this.checkSize();
    }

    checkSize() {
        $(this.options.root).each(function () {
            $(this).removeClass('without-scroll');
            if ($(this).find('.scroller__content').height() <= $(this).height()) {
                $(this).find('.scroller__bar-wrapper').hide();
                $(this).addClass('without-scroll');
            } else {
                $(this).removeClass('without-scroll');
                $(this).find('.scroller__bar-wrapper').show();
            }
        });
    }
}