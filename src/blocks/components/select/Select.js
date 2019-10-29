import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import select2 from "select2";
import {BaronScroll} from "../../../js/classes/BaronScroll";
// Initialise imported function as jQuery function
$.fn.select2.defaults.set("width", "100%");

export class Select {
    constructor(selector = ".js-select", theme = "gifton", options = {}) {
        this.selector = selector;
        this.theme = theme;

        this.baseOptions = {
            minimumResultsForSearch: Infinity,
            theme: this.theme,
            width: 'resolve'
        };

        this.options = $.extend(this.baseOptions, options);

        this.init();
    }

    init() {
        $(this.selector).select2(this.options);
        $(this.selector).on('select2:open', function () {
            let id = $(this).data('select2-id');
            let baronRoot = `baron-select-${id}`;

            $(document).find('.select2-results').addClass(baronRoot);

            new BaronScroll({
                root: `.${baronRoot}`,
                id: baronRoot
            });
        });

    }
}