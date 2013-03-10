define(["underscore"], function(_) {
	return {

		updateTab: function(id, properties, callback) {
			chrome.tabs.update(id, properties, callback);
		},

		reloadTab: function(chromeTab) {
			chrome.tabs.reload(chromeTab.id);
		},

		createTab: function(properties, callback) {
			this.getTab(properties.url, function(tab) {
				if (!tab) {
                    properties.active = false;
					chrome.tabs.create(properties, callback);
				} else {
                    callback(tab);
                }
			})
		},

		getTab: function(url, callback) {
			chrome.tabs.query({
				url: url
			}, function(tabs) {
				if (tabs && tabs.length) {
					callback(tabs[0]);
				} else {
					callback(null);
				}
			});
		},

        showTab: function(tab, callback) {
            this.updateTab(tab.id, {
                active: true
            }, callback);
        },

        showAndReloadTab: function(tab, callback) {
            var instance = this;
            this.updateTab(tab.id, {
                active: true
            }, function() {
                instance.reloadTab(tab);
                callback();
            });
        },

        closeTab: function(tab, callback) {
            chrome.tabs.remove(tab.id, callback);
        },

        getScheduleAction: function(action) {
            var actions = {
                "show": _.bind(this.showTab, this),
                "showAndReload": _.bind(this.showAndReloadTab, this),
                "close": _.bind(this.closeTab, this),
                "reload": _.bind(this.reloadTab, this)
            };

            return actions[action];
        }   
	}
});
