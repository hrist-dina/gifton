import $ from "jquery";

export class CatalogFilter {
	constructor(selector = '.js-catalog-filter') {
		this.filter = $(selector);

		this.init();
	}
	init() {

	}

}