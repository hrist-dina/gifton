export class Map {
    constructor(selector = "map") {
        this.map = selector;

        this.init();
    }

    init() {
        this.initMap();
    }

    initMap() {
        ymaps.ready().then(() => {
            let map = new ymaps.Map(this.map, {
                center: [55.67581315829148, 37.558698350509616],
                zoom: 16,
                controls: ['zoomControl']
            });

            map.behaviors.disable('scrollZoom');

            let placemark = new ymaps.Placemark([55.67512, 37.56128], {
                hintContent: "г. Москва, Профсоюзная ул., 23",
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: "default#image",
                // Своё изображение иконки метки.
                iconImageHref: "img/map/placemark.png",
                // Размеры метки.
                iconImageSize: [92, 103],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-45, -100]
            });
            map.geoObjects.add(placemark);
        });
    }
}