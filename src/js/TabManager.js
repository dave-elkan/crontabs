define(["underscore"], function(_) {
	return {

		updateTab: function(id, properties, callback) {
			chrome.tabs.update(id, properties, callback);
		},

		reloadTab: function(id) {
			chrome.tabs.reload(id);
		},

		createTab: function(properties, callback) {
			this.getTab(properties.url, function(tab) {
				if (!tab) {
					chrome.tabs.create(properties, callback);
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
		}
	}
});
