define(["underscore", "jquery", "ChromeTabs"], function(_, $, ChromeTabs) {
	return {

        /**
         * Gets or creates a tab and performs an action on it.
         *
         * @param {Function} action The action to perform. Accepts a ChromeTab and a callback.
         * @param {Function} callback The callback to call when action completes.
         */
        _getAndPerform: function(action, callback) {
            return _.bind(function(cronTab) {
                var deferred = jQuery.Deferred();

                deferred.done(_.bind(function(chromeTab) {
                    cronTab.setChromeTabId(chromeTab.id);
                    action.call(this, chromeTab, cronTab, callback);
                }, this));

                function resolveWithChromeTab(chromeTab) {
                    deferred.resolve(chromeTab);
                }

                if (cronTab.getChromeTabId()) {
                    ChromeTabs.get(cronTab.getChromeTabId(), resolveWithChromeTab);
                } else {
                    ChromeTabs.create({
                            url: cronTab.getUrl()
                        }, resolveWithChromeTab);
                }

            }, this);
        },

        /**
         * Closes a Chrome Tab if it exists
         *
         * @param {Number} id The Id of the Chrome Tab to close.
         * @param {Function} callback The callback to call when the tab is closed.
         */
        closeTab: function(id, callback) {
            ChromeTabs.get(id, function(chromeTab) {
                if (chromeTab) {
                    ChromeTabs.remove(chromeTab.id, callback);
                } else {
                    callback();
                }
            });
        },

        /**
         * Shows a Chrome Tab
         *
         * @param {ChromeTab} chromeTab The Chrome Tab to show.
         * @param {Function} callback The function to call once the tab has been shown.
         */
        _showChromeTab: function(chromeTab, cronTab, callback) {
            this._updateTab(chromeTab.id, {
                active: true,
                url: cronTab.getUrl()
            }, callback);
        },

        /**
         * Shows and reloads a Chrome Tab.
         *
         * @param {ChromeTab} chromeTab The Chrome Tab to show.
         * @param {Function} callback The function to call once the tab has been shown.
         */
        _showAndReloadChromeTab: function(chromeTab, cronTab, callback) {
            this._showChromeTab(chromeTab, cronTab, _.bind(function() {
                this._reloadChromeTab(chromeTab);
                if (callback) {
                    callback();
                }
            }, this));
        },

        /**
         * Updates a Chrome Tab.
         *
         * @param {Number} id The id of the Chrome Tab to update.
         * @param {Object} properties The properties to update.
         * @param {Function} callback The function to call once the tab has been shown.
         */
		_updateTab: function(id, properties, callback) {
			ChromeTabs.update(id, properties, callback);
		},

        /**
         * Reloads a Chrome Tab.
         *
         * @param {ChromeTab} chromeTab The Chrome Tab to reload.
         */
        _reloadChromeTab: function(chromeTab) {
			ChromeTabs.reload(chromeTab.id);
		},

        /**
         * Closes a Tab as an action.
         *
         * @param {Object} cronTab The Tab whose Chrome Tab to close.
         * @param {Function} callback The function to call once the tab is closed.
         */
        _performCloseOperation: function(cronTab, callback) {
            if (cronTab.getChromeTabId()) {
                this.closeTab(cronTab.getChromeTabId(), callback);
            } else {
                callback();
            }
        },

        /**
         * Returns an action.
         */
        getScheduleAction: function(action) {
            var actions = {
                "show": this._getAndPerform(this._showChromeTab),
                "showAndReload": this._getAndPerform(this._showAndReloadChromeTab),
                "close": _.bind(this._performCloseOperation, this),
                "reload": this._getAndPerform(this._reloadChromeTab)
            };

            return actions[action];
        }   
	}
});
