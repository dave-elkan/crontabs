define(["brace", "TabCollection", "TabStorage", "TabManager"], function(Brace, TabCollection, TabStorage, TabManager) {
	return Brace.Model.extend({

		namedEvents: [
			"cronsUpdated"
		],
		
		initialize: function() {
			this.onCronsUpdated(_.bind(this.cronsUpdated, this));
			this.later = later();
			var tabs = TabStorage.get();
			this.tabCollection = new TabCollection();
			this.tabCollection.on("reset", _.bind(this.updateOrCreateTabs, this));
			this.tabCollection.reset((tabs && tabs.length) ? tabs : []);
		},

		cronsUpdated: function() {
			later().stopExec();
			this.tabCollection.reset(TabStorage.get());
		},

		updateOrCreateTabs: function() {
			_.each(this.tabCollection.getValidTabs(), function(cronTab) {
				TabManager.createTab(cronTab.toChromeTab(), _.bind(function(chromeTab) {
					cronTab.setUrl(chromeTab.url);
                    this.tabCollection.save();
                    this.scheduleTab(cronTab, chromeTab);
				}, this));
			}, this);
		},

        scheduleTab: function(cronTab, chromeTab) {
            cronTab.getCrons().each(function(cron) {
                var schedule = cronParser().parse(cron.getExpression());
                var action = TabManager.getScheduleAction(cron.getOperation());
                later().exec(schedule, new Date(), function() {
                    action(chromeTab);
                });
            });
        }
	});
});
