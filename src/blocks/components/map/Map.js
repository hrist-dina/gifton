import $ from "jquery";

export class Map {
    constructor(id = "map") {
        this.map = id;
        this.idZoomIn = "zoom-in";
        this.idZoomOut = "zoom-out";

        this.init();
    }

    init() {
        this.initMap();
    }

    isMobile() {
        return $(window).width() <= 992;
    }

    zoomTemplate() {
        return "<div class='map-zoom'>" +
            `<div id='${this.idZoomIn}' class='plus'>+</div>` +
            `<div id='${this.idZoomOut}' class='minus'>-</div>` +
            "</div>";
    }

    controlOptions() {
        return {
            position: {
                top: this.isMobile() ? 60 : 320,
                right: '7%'
            },
        };
    }

    getCenter() {
        if (this.isMobile()) {
            return [55.67591315859148, 37.561118350509616];
        }
        return [55.67581315829148, 37.558698350509616];
    }

    initMap() {
        ymaps.ready().then(() => {
            let map = new ymaps.Map(this.map, {
                center: this.getCenter(),
                zoom: 16,
                controls: []
            });

            map.behaviors.disable('scrollZoom');

            let placemark = new ymaps.Placemark([55.67512, 37.56128], {
                hintContent: "г. Москва, Профсоюзная ул., 23",
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: "default#image",
                // Своё изображение иконки метки.
                iconImageHref: $('#'+this.map).attr('data-img')?$('#'+this.map).attr('data-img'):"img/map/gifton-placemark.png",
                // Размеры метки.
                iconImageSize: [86, 95],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-43, -95]
            });
            map.geoObjects.add(placemark);

            const self = this;
            // Создадим пользовательский макет ползунка масштаба.
            let ZoomLayout =
                ymaps.templateLayoutFactory.createClass(
                    this.zoomTemplate(),
                    {
                        // Переопределяем методы макета, чтобы выполнять дополнительные действия
                        // при построении и очистке макета.
                        build: function () {
                            // Вызываем родительский метод build.
                            ZoomLayout.superclass.build.call(this);

                            // Привязываем функции-обработчики к контексту и сохраняем ссылки
                            // на них, чтобы потом отписаться от событий.
                            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                            // Начинаем слушать клики на кнопках макета.
                            $(`#${self.idZoomIn}`).bind("click", this.zoomInCallback);
                            $(`#${self.idZoomOut}`).bind("click", this.zoomOutCallback);
                        },

                        clear: function () {
                            // Снимаем обработчики кликов.
                            $(`#${self.idZoomIn}`).unbind("click", this.zoomInCallback);
                            $(`#${self.idZoomOut}`).unbind("click", this.zoomOutCallback);

                            // Вызываем родительский метод clear.
                            ZoomLayout.superclass.clear.call(this);
                        },

                        zoomIn: function () {
                            var map = this.getData().control.getMap();
                            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                        },

                        zoomOut: function () {
                            var map = this.getData().control.getMap();
                            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                        }
                    }
                ),
                zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

            map.controls.add(zoomControl, this.controlOptions());

        });
    }
}