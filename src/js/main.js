requirejs.config(CrontabsConfig);

require(["backbone", "CrontabsRouter", "CrontabsEditor", "CrontabsRunner", "CrontabsEnabler", "CrontabsEnabledState"], function(Backbone, CrontabsRouter, CrontabsEditor, CrontabsRunner, CrontabsEnabler, CrontabsEnabledState) {
	var router = new CrontabsRouter();
	router.on("route:editor", CrontabsEditor);
	router.on("route:background", function() {

        var enabled = CrontabsEnabledState.isEnabled();
        if (enabled !== false) {
            enabled = true;
        }

		var runner = new CrontabsRunner({
            enabled: enabled
        });

        runner.on("change:enabled", function(model, enabled) {
            CrontabsEnabledState.set(enabled);
        });

        new CrontabsEnabler({
            model: runner
        });
		
		chrome.extension.onMessage.addListener(function() {
			runner.triggerCronsUpdated();
		});
	});
	Backbone.history.start({
		pushState: true
	});
});
