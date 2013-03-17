define(["underscore", "ChromeTabs"], function(_, ChromeTabs) {
	return {

        _getAndPerform: function(action, callback) {
            return _.bind(function(tabProperties) {
                this._getOrCreateChromeTab(tabProperties, _.bind(action, this));
            }, this);
        },

        _getAndCloseIfExists: function(properties, callback) {
            this._getChromeTab(properties, _.bind(function(chromeTab) {
                if (chromeTab) {
                    this._closeChromeTab(chromeTab, callback);
                } else {
                    callback();
                }
            }, this));
        },

        _getOrCreateChromeTab: function(properties, callback) {
            this._getChromeTab(properties, _.bind(function(chromeTab) {
                if (tab) {
                    callback(chromeTab);
                } else {
                    this._createChromeTab(properties, callback);
                }
            }, this));
        },

        _getChromeTab: function(properties, callback) {
            ChromeTabs.query({
                url: properties.url
            }, function(tabs) {
                if (tabs && tabs.length) {
                    callback(tabs[0]);
                } else {
                    callback();
                }
            });
        },

        _showChromeTab: function(chromeTab, callback) {
            this._updateTab(chromeTab.id, {
                active: true
            }, callback);
        },

        _showAndReloadChromeTab: function(chromeTab) {
            this._updateTab(chromeTab.id, {
                active: true
            }, _.bind(function() {
                this._reloadChromeTab(chromeTab);
            }, this));
        },

        _createChromeTab: function(properties, callback) {
            ChromeTabs.create(properties, callback);
		},

		_updateTab: function(id, properties, callback) {
			ChromeTabs.update(id, properties, callback);
		},

        _closeChromeTab: function(chromeTab, callback) {
            ChromeTabs.remove(chromeTab.id, callback);
        },
        
        _reloadChromeTab: function(chromeTab) {
			ChromeTabs.reload(chromeTab.id);
		},

        createTab: function(properties, callback) {
            this._getOrCreateChromeTab(properties, callback);
        },

        closeTab: function(properties, callback) {
            this._getAndCloseIfExists(properties, callback);
        },

        getScheduleAction: function(action) {

            var actions = {
                "show": this._getAndPerform(this._showChromeTab),
                "showAndReload": this._getAndPerform(this._showAndReloadChromeTab),
                "close": _.bind(this._getAndCloseIfExists, this),
                "reload": this._getAndPerform(this._reloadChromeTab)
            };

            return actions[action];
        }   
	}
});
