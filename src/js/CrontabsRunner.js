define(["brace", "TabCollection", "TabStorage", "TabManager", "later"], function(Brace, TabCollection, TabStorage, TabManager, later) {
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
			later.stopExec();
			this.tabCollection.reset(TabStorage.get());
		},

		updateOrCreateTabs: function() {
			_.each(this.tabCollection.getValidTabs(), function(tab) {
				TabManager.createTab(tab.toChromeTab(), _.bind(function(chromeTab) {
					tab.setUrl(chromeTab.url);
				}, this));
			}, this);
			_.delay(_.bind(function() {
				this.tabCollection.save();
			}, this));
		}
	});
});
