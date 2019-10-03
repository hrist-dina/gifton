import $ from "jquery";
import Validator from "../../../js/classes/Validator";

export class Footer {

    constructor() {
        this.form = '.js-footer-mailing';

        this.init();
    }

    init() {
        this.onSubmit();
    }

    onSubmit() {
        let footerForm = new Validator(this.form, false);
        $(this.form).find('form').on('submit', function (e) {
            e.preventDefault();
            $(this).removeClass('error');
            $(this).removeClass('success');
            if (!footerForm.init()) {
                $(this).addClass('success');
                $.ajax({
                    type: "POST",
                    data: {label: 'email', email: $(this).find('[name="email"]').val()},
                    url: '/local/script/ajax.php',
                    success: function(data) {}
                });
            } else {
                $(this).addClass('error');
            }
        });
    }
}