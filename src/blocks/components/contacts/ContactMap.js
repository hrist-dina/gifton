import {Map} from "%components%/map/Map";

export class ContactMap extends Map {

    controlOptions() {
        if (!this.isMobile()) {
            return {
                position: {
                    bottom: 60,
                    right: 50
                },
            };
        }
        return {
            position: {
                bottom: 60,
                right: 15
            },
        };
    }

    getCenter() {
        if (!this.isMobile()) {
            return [55.67481315859148, 37.555618350509616];
        }
        return [55.67591315859148, 37.561118350509616];
    }
}