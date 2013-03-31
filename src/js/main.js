requirejs.config(CrontabsConfig);

require(["backbone", "CrontabsRouter", "CrontabsEditor", "CrontabsRunner", "EnableButtonView", "CrontabsEnabledState"], function(Backbone, CrontabsRouter, CrontabsEditor, CrontabsRunner, EnableButtonView, CrontabsEnabledState) {
	var router = new CrontabsRouter();
	router.on("route:editor", CrontabsEditor);
	router.on("route:background", function() {

		var runner = new CrontabsRunner({
            enabled: CrontabsEnabledState.isEnabled()
        });

		chrome.extension.onMessage.addListener(function() {
			runner.triggerCronsUpdated();
		});
	});

	Backbone.history.start({
		pushState: true
	});
});
