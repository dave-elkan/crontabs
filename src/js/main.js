requirejs.config({
	baseUrl: "src/js",
	paths: {
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'jquery': 'lib/jquery',
		'brace': 'lib/backbone.brace',
		'Tab': 'model/Tab'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore'],
			exports: 'Backbone'
		},
		'brace': {
			deps: ['backbone'],
			exports: 'Brace'
		}
	}
});
