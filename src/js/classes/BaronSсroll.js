import $ from "jquery";
import baron from "baron";

export class BaronScroll {
    constructor(options) {
        this.options = $.extend({
            root    : '.scroller_wrap',
            barOnCls: 'baron'
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
    }

    initWrap() {
        const self = this;
        $(this.options.root).each(function () {
            if ($(this).find(`.${self.scroller}`).length) {
                return;
            }
            $(this).css('height', $(this).height());
            $(this).wrapInner(`<div class="${self.content}"></div>`);
            $(this).wrapInner(`<div class="${self.scroller}"></div>`);
            $(this).append(`<div class="${self.barWrapper}"><div class="${self.bar}"></div></div>`);
        });
    }

    initScroll() {
        if (!$(this.options.root).length || $(this.options.root).hasClass(this.options.barOnCls)) {
            return;
        }
        baron({
            root    : this.options.root,
            scroller: `.${this.scroller}`,
            bar     : `.${this.bar}`,
            barOnCls: this.options.barOnCls
        });
        this.checkSize();
    }

    checkSize() {
        $(this.options.root).each(function () {
            if ($(this).find('.scroller__content').height() <= $(this).height()) {
                $(this).find('.scroller__bar-wrapper').hide();
                $(this).find('.scroller').addClass('.with-scroll');
            } else {
                $(this).find('.scroller').removeClass('.with-scroll');
            }
        });
    }
}