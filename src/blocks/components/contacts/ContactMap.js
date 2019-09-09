import {Map} from "%components%/map/Map";

export class ContactMap extends Map{

    controlOptions() {
        return {
            position: {
                bottom: 60,
                right: 50
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