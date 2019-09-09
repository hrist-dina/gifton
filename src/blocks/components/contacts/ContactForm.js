import $ from "jquery";
import Validator from "../../../js/classes/Validator";

export class ContactForm {
    constructor(selector = '.js-contact-form') {
        this.form = selector;

        this.init();
    }

    init() {
        this.onSubmit();
    }

    onSubmit() {
        let contactForm = new Validator(this.form);
        contactForm.validateAgree();
        $(this.form).on('submit', function (e) {
            e.preventDefault();
            let form = $(this);
            $(form).find('.contacts-form__title').next('p').remove();            
            if (!contactForm.init()) {
                //отправка формы
                let dataForm = new FormData(document.querySelector('form#'+$(form).attr('id')));
                BX.showWait();
                $.ajax(
                    '/local/script/ajax.php',
                    {
                        method: 'post',
                        dataType: 'json',
                        data: dataForm,
                        processData: false,
                        contentType: false
                    }
                ).done(function(data) {
                    var classMess = '';
                    if(data.result=='success') {
                        $(form).find('[type=text], textarea, [type=file]').val('');
                        classMess = 'mess-success';
                    }
                    else
                        classMess = 'mess-error';
                    $(form).find('.contacts-form__title').after('<p class="'+classMess+'">'+data.mess+'</p>');
                    BX.closeWait();
                }).fail(function() {
                    $(form).find('.contacts-form__title').after('<p class="mess-error">Произошла ошибка. Повторите немного позже</p>');
                    BX.closeWait();
                });
            }        
        });
    }
}

$(document).ready(function () {
    $('.js-contact-form [type=file]').on('change', function() {
        addFile($(this).parent());
    });
    
    function addFile($label) {
        $label.parent().next('p').remove();
        if($label.find('input').val() == '') {
            $label.removeClass('success-file').parent().next('p').remove();
            return;
        }
        var file = document.querySelector('#'+$label.attr('for')).files[0];
        var nameFull = file.name;   
        var name = nameFull.split('.');   
        var ext = name[name.length-1];
        
        if(file>10485760  || name.length==1 || !( ext =='txt' || ext =='docx' || ext =='doc' || ext =='pdf' || ext =='jpeg' || ext =='jpg' || ext =='png' || ext =='gif' ) ) {
            $label.removeClass('success-file').parent().after('<p class="error-file">'+(file.size>10485760?'Слишком большой размер файла':'Недопустимый формат файла')+', файл не будет прикреплен</p>');
            document.querySelector('#'+$label.attr('for')).value = '';
        }  else {
            $label.addClass('success-file').parent().after('<p class="success-file">Прикреплен файл '+nameFull+'</p>');
        }
    }
});