requirejs.config({
	baseUrl: "src/js",
	paths: {
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'jquery': 'lib/jquery',
		'brace': 'lib/backbone.brace',
		'hogan': 'lib/hogan-2.0.0'
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
		},
		"hogan": {
			exports: "Hogan"
		}
	}
});
