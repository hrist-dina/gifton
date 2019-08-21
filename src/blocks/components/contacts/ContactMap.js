import {Map} from "%components%/map/Map";

export class ContactMap extends Map{

    controlOptions() {
        return {
            position: {
                bottom: 90,
                right: 50
            },
        };
    }
}