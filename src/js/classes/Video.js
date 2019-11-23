import $ from "jquery";

class Video {
    constructor() {
        this.allVideos = $("iframe[src*='//www.youtube.com'], iframe[src*='//player.vimeo.com']");

        this.videoWrapper = "video-container";
        this.init();
    }

    init() {
        if (!this.allVideos.length) {
            return;
        }
        this.aspectRatio();
    }

    aspectRatio() {
        const self = this;
        this.allVideos.each(function () {
            let wrap = $("<div>").addClass([self.videoWrapper]);
            $(this).wrap(wrap)
                .removeAttr("height")
                .removeAttr("width");
        });
    }
}

export {Video};