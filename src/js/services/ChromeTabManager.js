angular.module("crontabs").factory("ChromeTabManager", function(ChromeTabs) {

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
                    // Occasionally a tab can be destroyed at the same time it's created.
                    // Double check it still exists when this action is about to be performed.
                    if (chromeTab) {
                        cronTab.chromeTabId = chromeTab.id;
                        action.call(this, chromeTab, cronTab, callback);
                    }
                }, this));

                function resolveWithChromeTab(chromeTab) {
                    deferred.resolve(chromeTab);
                }

                if (cronTab.chromeTabId) {
                    ChromeTabs.get(cronTab.chromeTabId, resolveWithChromeTab);
                } else {
                    ChromeTabs.create({
                        url: cronTab.url
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
                } else if (callback) {
                    callback();
                }
            });
        },

        /**
         * Shows a Chrome Tab
         *
         * @param {Object} chromeTab The Chrome Tab to show.
         * @param {Object} cronTab The Crontab reference to show.
         * @param {Function} callback The function to call once the tab has been shown.
         */
        _showChromeTab: function(chromeTab, cronTab, callback) {
            ChromeTabs.update(chromeTab.id, {
                active: true
            }, callback);
        },

        /**
         * Shows and reloads a Chrome Tab.
         *
         * @param {Object} chromeTab The Chrome Tab to show.
         * @param {Object} cronTab The Cron Tab to show.
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
         * Reloads a Chrome Tab.
         *
         * @param {Object} chromeTab The Chrome Tab to reload.
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
            if (cronTab.chromeTabId) {
                this.closeTab(cronTab.chromeTabId, callback);
            } else {
                if (callback) {
                    callback();
                }
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
