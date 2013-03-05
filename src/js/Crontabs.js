requirejs.config({
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
});

require(["backbone", "router", "CrontabsEditor", "CrontabsRunner"], function(Backbone, Router, CrontabsEditor, CrontabsRunner) {
	var router = new Router();
	router.on("route:crontabs", CrontabsEditor);
	router.on("route:background", function() {
		var runner = new CrontabsRunner();
		
		chrome.extension.onMessage.addListener(function() {
			runner.triggerCronsUpdated();
		});
	});
	Backbone.history.start({
		pushState: true
	});
});
