requirejs.config(CrontabsConfig);

require(["backbone", "CrontabsRouter", "CrontabsEditor", "CrontabsRunner"], function(Backbone, CrontabsRouter, CrontabsEditor, CrontabsRunner) {
	var router = new CrontabsRouter();
	router.on("route:editor", CrontabsEditor);
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
