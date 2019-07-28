import $ from "jquery";

export class ChangeViewMode {
    constructor() {
        this.modeList = '.js-change-view-mode';
        this.cnangedBlock = '.js-change-view-mode-block';
        this.rows = 'rows';
        this.blocks = 'blocks';

        this.init();
    }

    init() {
        this.onChanged();
    }

    onChanged() {
        const self = this;
        $(this.modeList).find('input[type=radio]').on('change', function () {

            let mode = $(this).val();
            if (mode === this.rows || mode ===  this.blocks) {
                console.error(`${mode} - this mode is undefined`);
                return;
            }
            $(self.cnangedBlock).removeClass([self.rows, self.blocks]);
            $(self.cnangedBlock).addClass(mode);
        });
    }
}