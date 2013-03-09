var CrontabsConfig = {
	baseUrl: "src/js",
	paths: {
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'jquery': 'lib/jquery.min',
		'brace': 'lib/backbone.brace',
		'hogan': 'lib/hogan-2.0.0',
		'later': 'lib/laterjs/later-en.min'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'brace': {
			deps: ['backbone'],
			exports: 'Brace'
		},
		"hogan": {
			exports: "Hogan"
		},
		"later": {
			exports: "later"
		}
	}
}
