define(["underscore", "brace", "Tab", "TabStorage"], function(_, Brace, Tab, TabStorage) {
	return Brace.Collection.extend({

		model: Tab,

        initialize: function() {
            this.on("add remove", this._tabAdded, this);
        },

		load: function() {
			this.restore(TabStorage.get());
		},

        _tabAdded: function() {
            this.each(function(model) {
                model.trigger("changed", this.length > 1);
            }, this);
        },

		save: function(broadcast) {
			TabStorage.set(this.toJSON());
            if (broadcast) {
                this.broadcastTabsSaved();
            }
		},

		broadcastTabsSaved: function() {
			chrome.extension.sendMessage("saved");
		},

		/**
		 * Return valid tabs.
		 *
		 * TODO - Validate crons, etc
		 */
		getValidTabs: function() {
			return this.filter(function(tab) {
				return tab.getUrl() && tab.getCrons().length;
			});
		},

		toJSON: function() {
			return _.map(this.getValidTabs(), function(tab) {
				return {
					url: tab.getUrl(),
					crons: tab.getCrons().toJSON()
				};
			});
		},

		getChromeTabs: function() {
			return _.map(this.getValidTabs(), function(tab) {
				return {
					url: tab.getUrl()
				}
			});
		},

        getByChromeTabId: function(chromeTabId) {
            return this.find(function(tab) {
                if (tab.getChromeTabId() === chromeTabId) {
                    return tab;
                }
            });
        }
	});
});
